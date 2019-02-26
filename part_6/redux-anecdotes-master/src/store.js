import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdotes from './reducers/anecdoteReducer'
import notifications from './reducers/notificationReducer'
import filter from './reducers/filterReducer'

const reducer = combineReducers({ anecdotes, notifications, filter })
const store = createStore(reducer, applyMiddleware(thunk))

export default store
