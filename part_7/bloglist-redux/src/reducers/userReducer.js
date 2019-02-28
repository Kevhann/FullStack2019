import loginService from '../services/login'
import { setError } from './errorReducer'

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      console.log('loginuser yritti logata', username, password)
      const user = await loginService.login({ username, password })
      console.log('logattiin sisään', user)
      dispatch({ type: 'SETTOKEN', token: user.token })
      console.log('token onnas')
      dispatch({ type: 'SETUSER', user })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      setError('invalid login credentials', 5, dispatch)
      console.log('bad login', exception)
    }
  }
}
export const setUser = user => {
  return async dispatch => {
    dispatch({ type: 'SETUSER', user })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SETUSER':
      return action.user
    default:
      return state
  }
}

export default userReducer
