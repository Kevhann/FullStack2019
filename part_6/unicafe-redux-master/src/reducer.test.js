import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good, ok and bad are incremented and zeroed', () => {
    deepFreeze(initialState)
    const goodState = counterReducer(initialState, { type: 'GOOD' })
    deepFreeze(goodState)
    const okState = counterReducer(goodState, { type: 'OK' })
    deepFreeze(okState)
    const newState = counterReducer(okState, { type: 'BAD' })
    deepFreeze(newState)
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
    const zeroState = counterReducer(newState, { type: 'ZERO' })
    expect(zeroState).toEqual(initialState)
  })
})
