import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added "${content}"`, 10))
  }

  return (
    <div>
      <h3>Create a New Anecdote, eh?</h3>
      <form onSubmit={addAnecdote}>
      <input type="text" name="anecdote" />
      <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm