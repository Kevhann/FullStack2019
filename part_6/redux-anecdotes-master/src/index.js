import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdotes from './reducers/anecdoteReducer'
import notifications from './reducers/notificationReducer'
import filter from './reducers/filterReducer'

const store = createStore(combineReducers({ anecdotes, notifications, filter }))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
