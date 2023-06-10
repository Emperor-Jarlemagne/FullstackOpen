import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'

import { createStore } from 'redux'

const store = createStore(counterReducer)

const App = () => {
    const { good, ok, bad } = store.getState()
  return (
    <div>
      <button onClick={e => store.dispatch({ type: 'GOOD' })} > Good </button>
      <button onClick={e => store.dispatch({ type: 'OK' })} > Ok </button>
      <button onClick={e => store.dispatch({ type: 'BAD' })} > Bad </button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })} > Reset Stats </button>
      <div>
        Good: {good}
      </div>
      <div>
        Ok: {ok}
      </div>
      <div>
        Bad: {bad}
      </div>
      
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)