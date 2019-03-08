import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const Create = ({ createBlog, blogFormRef }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleBlogSubmit = async event => {
    event.preventDefault()

    const addedBlog = {
      title: title.props.value,
      author: author.props.value,
      url: url.props.value
    }
    console.log('backend response to create blog', addedBlog)
    blogFormRef.current.toggleVisibility()
    createBlog(addedBlog)

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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createBlog }
)(Create)
