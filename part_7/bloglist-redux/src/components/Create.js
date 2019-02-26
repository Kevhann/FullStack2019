import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { setSuccess } from '../reducers/successReducer'

const Create = ({ blogs, setBlogs, setError, blogFormRef, setSuccess }) => {
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
      setSuccess(`added blog ${title.props.value} by ${author.props.value}`, 10)
    } catch (error) {
      setError(error.response.data.error, 10)
    }
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h3>Create new blog!</h3>
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

export default connect(
  null,
  { setSuccess }
)(Create)
