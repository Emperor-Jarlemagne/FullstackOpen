import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = ({ content, votes}) =>
  axios.post(baseUrl, { content, votes }).then(res => res.data)

export const updateAnecdote = async (anecdote) => {
    return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
}
