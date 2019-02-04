import React, { useState, useEffect } from 'react'
import personService from './services/people'
import styles from './styles'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState(styles.empty)

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialPersons => setPersons(initialPersons))
    console.log('promise fulfilled')
  }, [])

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = event => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const setPrompt = (message, style) => {
    setMessage(message)
    setStyle(style)
    setTimeout(() => {
      setMessage(null)
      setStyle(styles.empty)
    }, 5000)
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    const sameName = persons.filter(p => p.name === newName)[0]
    if (sameName) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        sameName.number = newNumber
        personService
          .update(sameName)
          .then(res => {
            console.log(res)
            setPrompt(`${newName} numero muutettu`, styles.success)
            return setPersons(
              persons.map(p => (p.id !== sameName.id ? p : res))
            )
          })
          .catch(error => {
            setPrompt(`henkilö ${newName} oli jo poistettu`, styles.fail)
            setPersons(persons.filter(p => p.id !== sameName.id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(res => {
          console.log('create response', res)
          newPerson.id = res.id
          setPrompt(`lisättiin ${newPerson.name}`, styles.success)
          return setPersons(persons.concat(newPerson))
        })
        .catch(error => {
          console.log(error.response.data, 'homma failas')
          setPrompt(error.response.data.error, styles.fail)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removeById = (id, name) => {
    if (window.confirm(`poistetaanko ${name}`)) {
      personService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
      setPrompt(`${name} poistettu`, styles.fail)
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Prompt message={message} style={style} />
      <Filter filterBy={filterBy} change={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <Add
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
        submit={handleFormSubmit}
      />

      <h2>Numerot</h2>
      <Rows persons={persons} filterBy={filterBy} remove={removeById} />
    </div>
  )
}

const Rows = ({ persons, filterBy, remove }) => (
  <ul>
    {persons
      .filter(p => p.name.toLowerCase().includes(filterBy))
      .map(p => (
        <li key={p.name}>
          {p.name} - {p.number}
          <button onClick={() => remove(p.id, p.name)}>poista</button>
        </li>
      ))}
  </ul>
)

const Add = ({ name, nameChange, number, numberChange, submit }) => (
  <form onSubmit={submit}>
    <div>
      nimi:
      <input value={name} onChange={nameChange} />
    </div>
    <div>
      numero:
      <input value={number} onChange={numberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

const Filter = ({ filterBy, change }) => (
  <form onSubmit={event => event.preventDefault()}>
    <div>
      rajaa hakua:
      <input value={filterBy} onChange={change} />
    </div>
  </form>
)
const Prompt = ({ message, style }) => {
  return <div style={style}>{message}</div>
}

export default App
