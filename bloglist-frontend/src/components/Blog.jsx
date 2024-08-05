import { useState } from 'react'
import PrimaryRoundedButton from './PrimaryBtn'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const showWhenVisible = { display : blogVisible ? '' : 'none' }
  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }
  const handleLike = async () => {
    const updatedBlog = {
      ...blog, likes: blog.likes + 1
    }
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs((prevBlogs) => prevBlogs.map(b => b.id === blog.id ? returnedBlog : b))
    } catch (error) {
      console.error('Failed to update blog likes: ', error)
      throw error
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)
    if (confirmDelete) {
      try {
        await blogService.remove(blog.id)
        setBlogs((prevBlogs) => prevBlogs.filter(b => b.id !== blog.id))
      } catch (error) {
        console.error('Failed to delete blog: ', error)
      }
    }
  }
  return (
    <ul role="list" className="border-y-4 border-white">
      <li key={blog.title} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900 flex justify-start items-center gap-2">
              {blog.title}
              {blog.user.username === user.username &&(<PrimaryRoundedButton text={'delete'} onClick={handleDelete}/>)}
            </p>
            <div style={showWhenVisible}>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {blog.url}
              </p>
              <p className="text-sm font-semibold leading-6 text-gray-900 flex justify-start items-center gap-2">
                {'likes: ' + blog.likes}
                <PrimaryRoundedButton text={'like'} onClick={handleLike}/>
              </p>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {blog.author}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <PrimaryRoundedButton text={ blogVisible ? 'hide' : 'show'} onClick={toggleVisibility}/>
        </div>
      </li>
    </ul>
  )
}

export default Blog