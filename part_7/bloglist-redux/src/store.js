import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import success from './reducers/successReducer'
import error from './reducers/errorReducer'

const reducer = combineReducers({ success, error })
const store = createStore(reducer, applyMiddleware(thunk))
export default store
