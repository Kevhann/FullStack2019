export const notificationMessage = message => ({ type: 'MESSAGE', message })

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.message
    default:
      return state
  }
}
export default notificationReducer
