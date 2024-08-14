import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  
  test('bad is incremented twice', () => {
    const action = {
      type: 'BAD'
    }
    let state = initialState
    deepFreeze(state)

    state = counterReducer(state, action)
    state = counterReducer(state, action)
    
    expect(state).toEqual({
      good: 0,
      ok: 0,
      bad: 2
    })
  })
  
  test('ok is incremented twice', () => {
    const action = {
      type: 'OK'
    }
    let state = initialState
    deepFreeze(state)

    state = counterReducer(state, action)
    state = counterReducer(state, action)
    
    expect(state).toEqual({
      good: 0,
      ok: 2,
      bad: 0
    })
  })
  
  test('zero reset state', () => {
    let state = initialState
    deepFreeze(state)

    state = counterReducer(state, {type: 'GOOD'})
    state = counterReducer(state, {type: 'GOOD'})
    state = counterReducer(state, {type: 'OK'})
    state = counterReducer(state, {type: 'BAD'})
    
    expect(state).toEqual({
      good: 2,
      ok: 1,
      bad: 1
    })
    
    state = counterReducer(state, {type: 'ZERO'})
    
    expect(state).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})