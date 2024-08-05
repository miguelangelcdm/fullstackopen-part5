import { useState } from 'react'
import PrimaryRoundedButton from './PrimaryBtn'
import InputForm from './Input'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={addBlog} className="flex flex-col xl:flex-row gap-2">
        <InputForm
          text={'Title'}
          name={'title'}
          value={newBlog.title}
          onChange={handleChange}
        />
        <InputForm
          text={'Author'}
          name={'author'}
          value={newBlog.author}
          onChange={handleChange}
        />
        <InputForm
          text={'URL'}
          name={'url'}
          value={newBlog.url}
          onChange={handleChange}
        />
        <PrimaryRoundedButton text={'save'} />
      </form>
    </div>
  )
}

export default BlogForm
