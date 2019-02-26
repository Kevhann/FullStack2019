import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'

const Create = ({
  blogs,
  setBlogs,
  errorNotification,
  successNotification,
  blogFormRef
}) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleBlogSubmit = async event => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.create({
        title: title.props.value,
        author: author.props.value,
        url: url.props.value
      })
      console.log('backend response to create blog', addedBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      successNotification(
        `added blog ${title.props.value} by ${author.props.value}`
      )
    } catch (error) {
      errorNotification(error.response.data.error)
    }
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <form onSubmit={handleBlogSubmit}>
        <div>
          Title
          <input {...title.props} />
        </div>
        <div>
          Author
          <input {...author.props} />
        </div>
        <div>
          Url
          <input {...url.props} />
        </div>
        <button onClick={handleBlogSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Create
