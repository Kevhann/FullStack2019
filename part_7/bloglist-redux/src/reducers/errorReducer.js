export const setError = (error, time) => {
  console.log('setError', error)

  return async dispatch => {
    dispatch({ type: 'ERROR', error })
    await setTimeout(() => {
      dispatch({ type: 'ERROR', error: null })
    }, time * 1000)
  }
}

const errorReducer = (state = '', action) => {
  console.log('errorreducer', action, state)
  switch (action.type) {
    case 'ERROR':
      return action.error
    default:
      return state
  }
}

export default errorReducer
