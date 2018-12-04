// Counter: useEffect
import React, {useState, useEffect} from 'react'

function Counter() {
  const initCount = Number(window.localStorage.getItem('count') || 0)
  const [count, setCount] = useState(initCount)
  const incrementCount = () => setCount(count + 1)

  useEffect(
    () => {
      window.localStorage.setItem('count', count)

      return function cleanup() {
        window.localStorage.setItem('count', 0)
      }
    },
    [count],
  )

  return <button onClick={incrementCount}>{count}</button>
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: useEffect'

export default Usage
