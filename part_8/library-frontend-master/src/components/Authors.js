import React, { useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, authors, editAuthor }) => {
  const [author, setAuthor] = useState(null)
  const [year, setYear] = useState('')
  if (!show) {
    return null
  }
  if (authors.loading) return <div>Loading...</div>
  const authorsToShow = authors.data.allAuthors
  console.log('authors:', authors)

  const onSubmit = async event => {
    event.preventDefault()
    if (author) {
      await editAuthor({
        variables: { name: author.value, born: parseInt(year, 10) }
      })
    }
    setAuthor(null)
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authorsToShow.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={onSubmit}>
        <Select
          value={author}
          onChange={e => setAuthor(e)}
          options={authorsToShow.map(a => ({ value: a.name, label: a.name }))}
        />
        <div>
          year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button onClick={onSubmit} type="button">
          change birth year
        </button>
      </form>
    </div>
  )
}

export default Authors
