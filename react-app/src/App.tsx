import { SetStateAction, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Board from './components/Board'
import GameBoard from './components/GameBoard'

function App() {
  const [selectedOption, setSelectedOption] = useState('intro');

  const handleSelectChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className='App'>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="intro">Rules</option>
        <option value="option1">Creative Mode</option>
        <option value="option2">Adventure Mode</option>
      </select>
      <div>
      {selectedOption === 'intro' && <div>Hello World! You have a Board of size 8x8, and multiple Blocks of various shapes and sizes. The goal is to fit in as many as possible, and win points along the way. Once a row or column is complete it is reseted to empty, and you win the points for it!

On Creative mode you choose your own Blocks: complete freedom !

On Adventure mode you recieve 3 Blocks at a time, and have to fit all of them on your board to get to the next batch.</div>}

      {selectedOption === 'option1' && <Board rows={8} cols={8} size="5vh" defaultScore={10}/>}
      {selectedOption === 'option2' && <GameBoard rows={8} cols={8} size="5vh" defaultScore={10}/>}


      </div>
    </div>
  )
}
/*function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
*/
export default App
