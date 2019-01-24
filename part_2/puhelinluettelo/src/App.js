import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
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
  const handleFormSubmit = event => {
    event.preventDefault()
    console.log(persons)
    if (persons.map(p => p.name).indexOf(newName) > 0) {
      console.log('sama nimi')
      window.alert(`${newName} on jo varattu`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} change={handleFilterChange} />
      <Add
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
        submit={handleFormSubmit}
      />

      <h2>Numerot</h2>
      <Rows persons={persons} filter={filter} />
    </div>
  )
}

const Rows = ({ persons, filter }) => (
  <ul>
    {persons
      .filter(p => p.name.toLowerCase().includes(filter))
      .map(p => (
        <li key={p.name}>
          {p.name} - {p.number}
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

const Filter = ({ filter, change }) => (
  <form onSubmit={event => event.preventDefault()}>
    <div>
      rajaa hakua:
      <input value={filter} onChange={change} />
    </div>
  </form>
)

export default App
