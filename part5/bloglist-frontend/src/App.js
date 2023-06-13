import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import Notification from "./components/Notification"
import LoginForm from "./components/loginForm"
import BlogForm from "./components/blogForm"
import Togglable from "./components/togglable"
import { NotificationProvider } from "./NotificationContext"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const { dispatch } = useContext(NotificationContext)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("name")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      const userWithToken = { ...user, token: user.token }
      setUser(userWithToken)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem("name", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { text: "Successfully Logged In", type: "notification" },
      })
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { text: "Wrong Credentials", type: "error" },
      })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        returnedBlog.user = {
          username: user.username,
          name: user.name,
          id: user.id,
        }
        setBlogs(blogs.concat(returnedBlog))
        if (blogFormRef.current) {
          blogFormRef.current.toggleVisibility()
        }
        dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            text: `${blogObject.title} by ${blogObject.author} added`,
            type: "notification",
          }
        })
        setTimeout(() => {
          dispatch({ type: "CLEAR_NOTIFICATION" })
        }, 5000)
      })
      .catch((error) => {
        dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            text: error.response.data.error,
            type: "error",
          }
        })
        setTimeout(() => {
          dispatch({ type: "CLEAR_NOTIFICATION" })
        }, 5000)
      })
  }

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          text: `Error Deleting Blog ${exception.message}`,
          type: "error",
        }
      })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    }
  }

  const handleLikes = async (id, updatedBlog, updatedUser) => {
    if (!user) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          text: "Please Log In To Like a Blog",
          type: "error",
        }
      })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    } else {
      try {
        await blogService.update(id, updatedBlog)
        setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)))
        setUser(updatedUser)
      } catch (exception) {
        dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            text: `Error updating blog ${exception.message}`,
            type: "error",
          }
        })
        setTimeout(() => {
          dispatch({ type: "CLEAR_NOTIFICATION" })
        }, 5000)
      }
    }
  }

  return (
    <NotificationProvider>
    <div>
      <h1>BLOGS</h1>
      <Notification />
      {!user && (
        <Togglable buttonLabel="Log In">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} Is Logged In</p>
          <Togglable buttonLabel="Add a New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <h2>blogs</h2>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleDelete={handleDelete}
              handleLikes={handleLikes}
            />
          ))}
      </ul>
    </div>
    </NotificationProvider>
  )
}
export default App
