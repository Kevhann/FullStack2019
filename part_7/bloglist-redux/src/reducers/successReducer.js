export const setSuccess = (success, time, dispatch) => {
  dispatch({ type: 'SUCCESS', success })
  setTimeout(() => {
    dispatch({ type: 'SUCCESS', success: null })
  }, time * 1000)
}

const successReducer = (state = null, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return action.success
    default:
      return state
  }
}

export default successReducer
