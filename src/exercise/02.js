// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useFlexibleLocalStorage} from './useFlexibleLocalStorage'
// import {useLocalStorageState} from './useLocalStorageState'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // const newInitialName = window.localStorage.getItem('name') || initialName
  // const [name, setName] = React.useState(newInitialName)
  // EXTRA CREDIT #1 💯
  // const getName = () => localStorage.getItem('name') || initialName
  // const [name, setName] = React.useState(() => getName())
  // EXTRA CREDIT #2 and #3 💯
  // const [name, setName] = useLocalStorageState(initialName)
  // EXTRA CREDIT #4 💯
  const [name, setName] = useFlexibleLocalStorage({
    key: 'name',
    initialValue: initialName,
  })
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // React.useEffect(() => {
  //   localStorage.setItem('name', name)
  // }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Ted" />
}

export default App
