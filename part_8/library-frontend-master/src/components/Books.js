import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo-hooks'
export const FIND_BOOKS = gql`
  query findBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      genres
      author {
        name
      }
      published
      id
    }
  }
`
const Books = () => {
  const [books, setBooks] = useState([])
  const [allBooks, setAllBooks] = useState([])

  const client = useApolloClient()

  const findBooks = async genre => {
    const res = await client.query({ query: FIND_BOOKS, variables: { genre } })
    console.log('res:', res.data.allBooks)
    setBooks(res.data.allBooks)
    if (allBooks.length === 0) {
      setAllBooks(res.data.allBooks)
    }
  }

  useEffect(() => {
    findBooks()
  }, [])

  const genres = []
  allBooks.forEach(b => {
    b.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>

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
      <h3>Genres</h3>
      <div>
        {genres.map(g => (
          <button key={g} onClick={() => findBooks(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => findBooks()}>All genres</button>
      </div>
    </div>
  )
}

export default Books
