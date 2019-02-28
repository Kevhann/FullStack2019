import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import success from './reducers/successReducer'
import error from './reducers/errorReducer'
import blogs from './reducers/blogReducer'
import user from './reducers/userReducer'
import users from './reducers/allUsersReducer'

const reducer = combineReducers({ success, error, blogs, user, users })
const store = createStore(reducer, applyMiddleware(thunk))
export default store
