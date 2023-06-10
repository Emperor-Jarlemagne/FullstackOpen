import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, setAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes))
    })
  }, [dispatch])

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    console.log(anecdote.content, filter)
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
  })

  const handleVote = async (id, content) => {
    console.log('vote', id)
    await anecdoteService.update({ 
      ...anecdotes.find(a => a.id === id), 
      votes: anecdotes.find(a => a.id === id).votes + 1 
    })
    dispatch(vote(id))
    dispatch(setNotification(`You voted for "${content}"`, 10))
  }
 
  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map(anecdote => {
        console.log(typeof anecdote.content)
        return (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            Has {anecdote.votes} Votes <br />
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>Vote</button>
          </div>
        </div>
        )
})}
    </div>
  )
}

export default AnecdoteList