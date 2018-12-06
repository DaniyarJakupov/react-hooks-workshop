// VanillaTilt: React.lazy
import React, {useState, Suspense} from 'react'

const Tilt = React.lazy(() => import('../tilt'))

function App() {
  const [showTilt, setShowTilt] = useState()
  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={showTilt}
          onChange={e => setShowTilt(e.target.checked)}
        />
        {' show tilt'}
      </label>
      <div>
        {showTilt && (
          <Suspense fallback="loading...">
            <div className="totally-centered">
              <Tilt>
                <div className="totally-centered">vanilla-tilt.js</div>
              </Tilt>
            </div>
          </Suspense>
        )}
      </div>
    </div>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <App />
}
Usage.title = 'VanillaTilt: React.lazy'

export default Usage
