import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LoggedIn from './components/LoggedIn'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggle from './components/Toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setNotification({ type: 'error', message: 'Wrong credentials' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  const toggleRef = useRef()

  const createBlog = async (blog) => {
    toggleRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        type: 'success',
        message: `New blog added: ${newBlog.title}`,
      })
    } catch (exception) {
      setNotification({ type: 'error', message: 'Could NOT create a new blog' })
    } finally {
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      })
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
      setNotification({ type: 'success', message: 'Like saved' })
    } catch (exception) {
      setNotification({ type: 'error', message: 'Could NOT update blog' })
    } finally {
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleBlogDelete = async (blog) => {
    try {
      await blogService.remove(blog)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      setNotification({ type: 'success', message: 'Blog deleted' })
    } catch (exception) {
      setNotification({ type: 'error', message: 'Could NOT delete blog' })
    } finally {
      setTimeout(() => setNotification(null), 5000)
    }
  }

  useEffect(() => {
    const session = window.localStorage.getItem('loggedUser')
    if (!session) return

    const user = JSON.parse(session)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()

      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      {user === null ? (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <LoggedIn user={user} handleLogout={handleLogout} />

          <Toggle buttonLabel="create new blog" ref={toggleRef}>
            <CreateBlog addBlog={createBlog} />
          </Toggle>

          <ul data-testid="blogs">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li key={blog.id}>
                  <Blog
                    blog={blog}
                    user={user}
                    onLike={handleLike}
                    onDelete={handleBlogDelete}
                  />
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default App
