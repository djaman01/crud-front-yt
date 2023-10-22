import React, { useEffect, useState } from 'react'
import List from './components/List';
import axios from "axios"
import { baseURL } from './utils/constant';


//rafce = shortcut for React arrow function component
const App = () => {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);//Will handle all the data, and it is an array
  const [updateUI, setUpdateUI] = useState(false); //Pour faire apparaitre la task qu'on a ajouté dans le browser

  const handleInput = (e) => setInput(e.target.value);

  useEffect(() => {
    axios.get(`${baseURL}/get `)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data) //la data ecrite devient la valeur de la state variable tasks
      })
  }, [updateUI])//When the state variable updateUI will change, then the useEffect will re-rendre, and get the data

  //on donne à la propriété task de l'objet dans la base de donnée, la valeur de la "state variable input" qui est la valeur de l'input
  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState)=> !prevState) //Pour montrer la task qu'on a ajouter dans le browser automatiquement, sans reload car: a chaque fois qu'on va addTask ca va toggle la valeur de updateUI entre false et true, et donc re-render le useEffect qui donne la valeur a task variable et donc va apparaitre dans le browser car on map dessus
    })
  }

  return (
    <main>
      <h1 className='title'>CRUD Operations</h1>

      <div className="input_holder">

        <input type="text" value={input} onChange={handleInput} />

        {/* Quand on clique sur le bouton ça appelle la function addTask, qui donne la valeur de l'input à la property task dans la base de donnée */}
        <button type='submit' onClick={addTask}> Add Task </button>

      </div>

      {/* We will map through the tasks state variable which is an Array of elements */}
      <ul>
        {tasks.map((task) => (  //On va passer des valeurs au props de <List /> 
          <List
            key={task._id}
            id={task._id}
            task={task.task} //task={task.task}= attribut task = element task et SA property task= valeur de l'input qui va donc s'afficher dans le browser quand on va addTask
            setUpdateUI={setUpdateUI} />
        ))}
      </ul>


    </main>
  )
}

export default App
