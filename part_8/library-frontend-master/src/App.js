import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { FIND_BOOKS } from './components/Books'

import { gql } from 'apollo-boost'
import { Subscription } from 'react-apollo'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        id
      }
      published
      genres
      id
    }
  }
`

const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        id
      }
      published
      genres
      id
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      favouriteGenre
    }
  }
`

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.key('library-user-token'))
  }, [])
  const client = useApolloClient()

  const includedIn = (set, object) => {
    console.log('set:', set)
    console.log('object:', object)
    return set.map(book => books.title).includes(object.title)
  }

  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: FIND_BOOKS }],
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: FIND_BOOKS })
      const addedBook = response.data.addBook
      console.log('addedBook:', addedBook)
      console.log('dataInStore1:', dataInStore)
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        dataInStore.allBooks.push(addedBook)
        client.writeQuery({ query: FIND_BOOKS, data: dataInStore })
      }
    }
  })
  const editAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const books = useQuery(FIND_BOOKS)
  const login = useMutation(LOGIN)
  const authors = useQuery(ALL_AUTHORS)
  const logout = () => {
    localStorage.removeItem('library-user-token')
    localStorage.removeItem('library-user-favourite')
    setPage('authors')
    setToken(null)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('recommend')}>Recommended</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
        {!token && (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        )}
      </div>
      <Authors
        show={page === 'authors'}
        authors={authors}
        editAuthor={editAuthor}
      />
      {page === 'books' && (
        <>
          {books.loading && <>loading</>}
          {!books.loading && <Books />}
        </>
      )}
      {page === 'login' && (
        <LoginForm login={login} setToken={setToken} setPage={setPage} />
      )}
      {page === 'recommend' && <Recommend />}

      <NewBook show={page === 'add'} addBook={addBook} />
      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({ subscriptionData }) => {
          console.log('subscriptionData:', subscriptionData)
          const addedBook = subscriptionData.data.bookAdded
          window.alert(`Book ${addedBook.title} added`)
          const dataInStore = client.readQuery({ query: FIND_BOOKS })
          console.log('dataInStore2:', dataInStore)
          if (!includedIn(dataInStore.allBooks, addedBook)) {
            dataInStore.allBooks.push(addedBook)
            client.writeQuery({ query: FIND_BOOKS, data: dataInStore })
          }
        }}
      >
        {() => null}
      </Subscription>
    </div>
  )
}

export default App
