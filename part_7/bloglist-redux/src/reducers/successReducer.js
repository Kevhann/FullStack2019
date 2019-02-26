export const setSuccess = (success, time) => {
  return async dispatch => {
    dispatch({ type: 'SUCCESS', success })
    await setTimeout(() => {
      dispatch({ type: 'SUCCESS', success: null })
    }, time * 1000)
  }
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
