import { useEffect } from 'react'
//import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/AnecdoteFilter'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h1>ANECDOTES</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create New Anecdote</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App