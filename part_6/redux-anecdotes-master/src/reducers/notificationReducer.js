export const notificationMessage = (message, time) => {
  return async dispatch => {
    dispatch({ type: 'MESSAGE', message })
    await setTimeout(() => {
      dispatch({ type: 'MESSAGE', message: null })
    }, time * 1000)
  }
}
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.message
    default:
      return state
  }
}
export default notificationReducer
