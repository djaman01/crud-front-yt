import React, { useEffect, useState } from 'react'
import { List } from './components/List';


//rafce = shortcut for React arrow function component
const App = () => {

  const [input, setInput] = useState("");
  const [task, setTasks] = useState("");

  const handleInput = (e) => setInput(e.target.value);

  useEffect(()=> {
    
  }, [])

  return (
    <main>
      <h1 className='title'>CRUD Operations</h1>

      <div className="input_holder">

        <input type="text" value={input} onChange={handleInput} />
        <button type='submit'> Add Task </button>

      </div>

      <ul>
        {/* Component qu'on a crée plus tard */}
        <List task="Something" />
      </ul>


    </main>
  )
}

export default App
