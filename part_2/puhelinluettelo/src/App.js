import React, { useState, useEffect } from 'react'
import personService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilter] = useState('')

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

  const handleFormSubmit = event => {
    event.preventDefault()
    const sameName = persons.map(p => p.name).indexOf(newName)
    if (sameName > 0) {
      if (
        window.confirm(
          `${
            persons[sameName].name
          } on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        personService.update(persons[sameName].id, newNumber)
        const copy = persons
        copy[sameName].number = newNumber
        setPersons(copy)
      }
    } else {
      personService
        .create({
          name: newName,
          number: newNumber
        })
        .then(response => setPersons(persons.concat(response)))
    }
    setNewName('')
    setNewNumber('')
  }

  const removeById = (id, name) => {
    if (window.confirm(`poistetaanko ${name}`)) {
      personService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filterBy={filterBy} change={handleFilterChange} />
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

export default App
