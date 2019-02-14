import React, { useState } from 'react'
import Remove from './Remove'

const Blog = ({ blog, handleBlogLike, user, handleDeletion }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (!showAll)
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowAll(true)} className="condensedBlog">
          {blog.title} {blog.author}
        </div>
      </div>
    )

  return (
    <div style={blogStyle} className="expandedBlog">
      <div onClick={() => setShowAll(false)}>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button
          onClick={() => {
            console.log('liked blog', blog.title)
            handleBlogLike(blog)
          }}
        >
          like
        </button>
      </div>
      <div>Added by {blog.user ? blog.user.name : 'unknown'}</div>
      <Remove user={user} blog={blog} handleDeletion={handleDeletion} />
    </div>
  )
}

export default Blog
