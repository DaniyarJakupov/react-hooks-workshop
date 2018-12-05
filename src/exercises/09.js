// Stopwatch: Custom hook
import React, {useReducer, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

function useStopwatch() {
  const [state, setState] = useReducer(reducer, {
    running: false,
    lapse: 0,
  })
  const {running, lapse} = state
  const timerRef = useRef(null)

  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        setState({lapse: Date.now() - startTime})
      }, 0)
    }
    setState({running: !running})
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleClearClick() {
    clearInterval(timerRef.current)
    setState({running: false, lapse: 0})
  }

  return [state, handleRunClick, handleClearClick]
}

function Stopwatch() {
  // call your useStopwatch custom hook and get the state and event handlers
  // for two individual stopwatches.
  const [state, handleRunClick, handleClearClick] = useStopwatch()
  const [state2, handleRunClick2, handleClearClick2] = useStopwatch()

  return (
    <div style={{textAlign: 'center'}}>
      <StopwatchView
        lapse={state.lapse}
        running={state.running}
        onRunClick={handleRunClick}
        onClearClick={handleClearClick}
      />
      <hr />
      <span>Lapse Difference: {state.lapse - state2.lapse}ms</span>
      <hr />
      <StopwatchView
        lapse={state2.lapse}
        running={state2.running}
        onRunClick={handleRunClick2}
        onClearClick={handleClearClick2}
      />
    </div>
  )
}

function StopwatchView({lapse, running, onRunClick, onClearClick}) {
  return (
    <>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={onRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClearClick} style={buttonStyles}>
        Clear
      </button>
    </>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: Custom hook'

export default Usage
