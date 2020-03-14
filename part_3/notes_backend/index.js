const express = require("express")
const app = express()
const bodyParser = require("body-parser")

let notes = [
  {
    id: 1,
    content: "HTML on helppoa",
    date: "2017-12-10T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Selain pystyy suorittamaan vain javascriptiä",
    date: "2017-12-10T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    date: "2017-12-10T19:20:14.298Z",
    important: true
  }
]

app.use(bodyParser.json())

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

app.post("/notes", (req, res) => {
  const body = req.body
  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" })
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  console.log(note)
  notes = notes.concat(note)
  res.json(note)
})

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.get("/notes", (req, res) => {
  console.log("notes")

  res.send(notes)
})

app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const note = notes.find(note => note.id === id)
  console.log(note)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const port = 3001
app.listen(port)
console.log(`server running on port ${port}`)
