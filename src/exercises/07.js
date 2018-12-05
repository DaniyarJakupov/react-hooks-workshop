// Stopwatch: useReducer (a la redux)
import React, {useReducer, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

const initialState = {
  lapse: 0,
  running: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LAPSE':
      return {...state, lapse: action.payload}
    case 'SET_RUNNING':
      return {...state, running: action.payload}
    case 'CLEAR':
      return {...initialState}
    default:
      break
  }
}

function Stopwatch() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {running, lapse} = state
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        dispatch({type: 'SET_LAPSE', payload: Date.now() - startTime})
      }, 0)
    }
    dispatch({type: 'SET_RUNNING', payload: !running})
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    dispatch({type: 'CLEAR'})
  }

  return (
    <div style={{textAlign: 'center'}}>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={handleRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: useReducer (a la redux)'

export default Usage
