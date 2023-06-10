import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import { NotificationContext } from './actions/NotificationContext'
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests/requests'

const queryClient = new QueryClient()

const App = () => {
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (data, id) => {
      queryClient.invalidateQueries('anecdotes')
        const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === id ? { ...anecdote, votes: data.votes } : anecdote
          )
          queryClient.setQueryData('anecdotes', updatedAnecdotes)
    }
  })

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 3,
  })

  const anecdotes = result.data

  const { dispatch } = useContext(NotificationContext)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (id) => {
    const anecdoteToVote = anecdotes.find((a) => a.id === id)
    const updatedVotes = anecdoteToVote.votes + 1
    updateAnecdoteMutation.mutate({ ...anecdoteToVote, votes: updatedVotes })
    dispatch({ type: 'SUCCESS', payload: `${anecdoteToVote.content} has been voted for!` })
  }


  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm queryClient={queryClient} updateAnecdoteMutation={updateAnecdoteMutation} />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </QueryClientProvider>
  )
}

export default App
