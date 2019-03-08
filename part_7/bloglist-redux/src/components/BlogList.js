import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  console.log('bloglist', blogs)
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
                <td>{blog.likes}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}
const mapStateToProps = state => ({
  blogs: state.blogs
})
export default connect(mapStateToProps)(BlogList)
