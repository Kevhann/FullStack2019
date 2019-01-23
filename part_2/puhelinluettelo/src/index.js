import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
const phoneBook = [
  { name: 'Arto Hellas', number: '645-98723' },
  { name: 'Eero Esimerkki', number: '123-123456' },
  { name: 'Miehinen Menninkäinen', number: '897-541378' },
  { name: 'Martti Tienari', number: '040-123456' },
  { name: 'Arto Järvinen', number: '040-123456' },
  { name: 'Lea Kutvonen', number: '040-123456' }
]

ReactDOM.render(<App phoneBook={phoneBook} />, document.getElementById('root'))
