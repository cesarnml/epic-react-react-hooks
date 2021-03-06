// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js
import {useFlexibleLocalStorage} from './useFlexibleLocalStorage'
import * as React from 'react'

function Board({step, setStep, history, setHistory}) {
  // 🐨 squares is the state for this component. Add useState for squares
  // EXTRA CREDIT #1 💯
  // const retrieveInitialSquares = () => {
  //   const savedSquares = localStorage.getItem('squares')
  //   if (savedSquares) {
  //     return JSON.parse(savedSquares)
  //   } else {
  //     return Array(9).fill(null)
  //   }
  // }

  // const [squares, setSquares] = React.useState(retrieveInitialSquares)
  // EXTRA CREDIT #2 💯
  const squares = history[step]
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  // React.useEffect(() => {
  //   localStorage.setItem('squares', JSON.stringify(squares))
  // })
  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    } else {
      const previousHistory = history.slice(0, step + 1)
      setHistory([
        ...previousHistory,
        squares.map((value, index) => (index === square ? nextValue : value)),
      ])
      setStep(prev => prev + 1)
    }
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setHistory([Array(9).fill(null)])
    setStep(0)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">STATUS: {status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useFlexibleLocalStorage({
    key: 'history',
    initialValue: [Array(9).fill(null)],
  })
  const [step, setStep] = useFlexibleLocalStorage({
    key: 'step',
    initialValue: 0,
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board
          step={step}
          setStep={setStep}
          history={history}
          setHistory={setHistory}
        />
      </div>
      <div style={{marginLeft: 30}}>
        {Array(history.length)
          .fill(null)
          .map((value, index) => {
            return (
              <div key={index}>
                <span style={{color: index === step ? 'gray' : 'black'}}>
                  {index + 1}.
                </span>{' '}
                <button
                  disabled={index === step}
                  onClick={() => setStep(index)}
                >
                  {index === 0
                    ? `Go to game start ${index === step ? '(current)' : ''}`
                    : `Go to move ${index} ${
                        index === step ? '(current)' : ''
                      }`}
                </button>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
