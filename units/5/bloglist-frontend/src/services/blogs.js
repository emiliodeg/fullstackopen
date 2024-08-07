import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog)

  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)

  return response.data
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`)

  return response.data
}

export default { getAll, create, setToken, update, remove }
