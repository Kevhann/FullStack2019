export const setError = (error, timeInSeconds, dispatch) => {
  dispatch({ type: 'ERROR', error })
  setTimeout(() => {
    dispatch({ type: 'ERROR', error: null })
  }, timeInSeconds * 1000)
}

const errorReducer = (state = null, action) => {
  console.log('Reducer', action, state)
  switch (action.type) {
    case 'ERROR':
      console.log('errorReducer', action.error)
      return action.error
    default:
      return state
  }
}

export default errorReducer
