import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationBox from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/loginForm'
import Togglable from './components/Togglable'
import './app.css'
import './index.css'
import PrimaryRoundedButton from './components/PrimaryBtn'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [Notification, setNotification] = useState({
    message: '',
    type: '',
  })
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const initializeData = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
        }

        // Fetch the blogs concurrently
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.error('Failed to initialize app data:', error)
      }
    }
    initializeData()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotification({ message: `Welcome ${user.name}`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, error: null })
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, error: null })
      }, 5000)
    }
  }

  const logout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setNotification({ message: 'Logout successful', type: 'success' })
    setTimeout(() => {
      setNotification({ message: null, error: null })
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message: `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, error: null })
      }, 5000)
    } catch (error) {
      setNotification({ message: `Failed to add blog: ${error}`, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, error: null })
      }, 5000)
    }

  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === blog.id ? returnedBlog : b))
      );
    } catch (error) {
      console.error("Failed to update blog likes: ", error);
      throw error;
    }
  };



  return (
    <div className="bg-slate-600 p-4 flex flex-col gap-4">
      <h1 className="text-xl">blogs</h1>
      <NotificationBox message={Notification.message} type={Notification.type}/>
      {user === null ? (
        <Togglable buttonLabel='Log In'>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <div className="flex gap-2 items-center">
            <p>{user.name} logged-in</p>
            <form onSubmit={logout}>
              <PrimaryRoundedButton text={'logout'} />
            </form>
          </div>
          <Togglable buttonLabel='add blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
        </div>
      )}
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} handleLike={() => handleLike(blog)}/>
        ))}
    </div>
  )
}

export default App
