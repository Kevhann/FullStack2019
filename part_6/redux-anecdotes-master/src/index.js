import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdotes from './reducers/anecdoteReducer'
import notifications from './reducers/notificationReducer'
import filter from './reducers/filterReducer'

const store = createStore(combineReducers({ anecdotes, notifications, filter }))

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

render()
store.subscribe(render)
