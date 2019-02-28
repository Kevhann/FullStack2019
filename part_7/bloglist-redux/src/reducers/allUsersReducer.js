import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    console.log('haetaan kaikki käyttäjät')
    const users = await userService.getAll()
    dispatch({ type: 'GET_ALL_USERS', users })
  }
}

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.users
    default:
      return state
  }
}
export default allUsersReducer
