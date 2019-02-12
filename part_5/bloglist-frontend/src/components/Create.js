import React, { useState } from 'react'
import blogService from '../services/blogs'

const Create = ({
  blogs,
  setBlogs,
  errorNotification,
  successNotification,
  blogFormRef
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async event => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.create({ title, author, url })
      console.log('backend response to create blog', addedBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      successNotification(`added blog ${title} by ${author}`)
    } catch (error) {
      errorNotification(error.response.data.error)
    }
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <form onSubmit={handleBlogSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={handleBlogSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Create
