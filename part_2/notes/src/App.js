import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const App = props => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('uusi muistiinpano...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('initial effect')
    noteService.getAll().then(response => {
      console.log('initial promise fulfilled')
      setNotes(response.data)
    })
  }, [])
  console.log('render', notes.length, 'notes')

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(changedNote).then(response => {
      setNotes(notes.map(note => (note.id !== id ? note : response.data)))
    })
  }

  const rows = () =>
    notesToShow.map(note => (
      <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)}
      />
    ))

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = event => {
    event.preventDefault()
    console.log('nappia painettu', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }
    noteService.create(noteObject).then(response => {
      console.log(response)
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  }
  const handleNoteChange = event => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki'}
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default App
