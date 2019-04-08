import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { FIND_BOOKS } from './Books'
const Recommend = () => {
  const [books, setBooks] = useState([])
  const favourite = localStorage.getItem('library-user-favourite')
  const client = useApolloClient()
  client
    .query({ query: FIND_BOOKS, variables: { genre: favourite } })
    .then(result => {
      console.log('result', result)
      setBooks(result.data.allBooks)
    })
  return (
    <div>
      <h2>Recommended books</h2>
      <p>
        Your favourite genre is <strong>{favourite}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Recommend
