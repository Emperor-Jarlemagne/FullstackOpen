import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHORS } from './queries'
import { updateCache } from '../App'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(UPDATE_AUTHORS, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_AUTHORS }, response.data.editAuthor)
        }
  })
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  if (!props.show) {
    return null
  }
   if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const authors = data.allAuthors
  const authorOptions = authors.map((author) => ({
    value: author.name,
    label: author.name
  }))

  const submit = async (event) => {
    event.preventDefault()
    console.log('change birthyear...')
    editAuthor({ variables: { name, born: parseInt(born) }})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Author</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <div>
      <form onSubmit={submit}>
        <div>
          name: 
          <Select value={{ value: name, label: name}} 
          onChange={(option) => setName(option.value)} 
          options={authorOptions}/>
        </div>
        <div>
          born: 
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          </div>
        <button type="submit">update author</button>
      </form>
      </div>
    </div>
  )
}
export default Authors
