import React, { useEffect, useState } from 'react'
import List from './components/List';
import axios from "axios"
import { baseURL } from './utils/constant';


//rafce = shortcut for React arrow function component
const App = () => {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);//Will handle all the data, and it is an array
  const [updateUI, setUpdateUI] = useState(false); //Pour faire apparaitre/disparaitre la task qu'on a ajouté dans le browser
  const [updateId, setUpdateId] = useState(null); //Variable qui donne un id au task/text qu'on va modifer

  const handleInput = (e) => setInput(e.target.value);

  //HTTP Get Request
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
      setUpdateUI((prevState) => !prevState) //Pour montrer la task qu'on a ajouter dans le browser automatiquement, sans reload car: a chaque fois qu'on va addTask ca va toggle la valeur de updateUI entre false et true, et donc re-render le useEffect qui donne la valeur a task variable et donc va apparaitre dans le browser car on map dessus
    })
  };

  //Pour changer la valeur de la state variable inpiut quand on va modifier
  const updateMode = (id, text) => { //Voir List.js car va etre activer quand on clique sur le stylo
    console.log(text);
    setInput(text); //Quand update mode est appelé, ca donne à la state variable input, la valeur du text qu'on veut modifier et qui va etre réecrit dans l'input
    setUpdateId(id);//Et ca donne une nouvelle valeur a la state variable updateId
  };

  //PUT Request pour modifier la valeur de task
  //Si la state variable updateID n'est pas null (=quand on clique sur le crayon pour modifier la task), ca active cette arrowfunction updateTask
  //Le code est une PUT Request pour modifer la valeur du task par ce qui est écrit dans l'input
  const updateTask =() => {
    axios.put(`${baseURL}/update/${updateId}`, {task: input}).then((res)=> {
      console.log(res.data);
      setUpdateUI((prevState)=> !prevState); //Ca toggle updateUI pour afficher le changement
      setUpdateId(null);//Puis ca rend updateId null une fois le changement fait (c'est updateMethode ecrit precedemment qui lui donne une valeur)
      setInput("");//Et ca vide l'input une fois le changement fait
    })
  }



  return (
    <main>
      <h1 className='title'>CRUD Operations</h1>

      <div className="input_holder">

        <input type="text" value={input} onChange={handleInput} />

  {/* updateId est une state variable qui a pour valeur: null / Quand on clique sur le stylo, ca active l'arrowfunction updateMode qui donne la valeur 'id' à updateId*/}
  {/* La on va dire que si updateId a une valeur différente de null, alors active l'arrow function updateTask sinon juste active l'arrow function addTask */}
        <button type='submit' onClick={updateId ? updateTask : addTask}>
          {/* Si updateId est different de nul, ecrit a cote du bouton "update Task" */}
          {updateId ? "Update Task" : "Add Task"}
        </button>

      </div>

      {/* We will map through the tasks state variable which is an Array of elements */}
      <ul>
        {tasks.map((task) => (  
          //On va passer des valeurs au props de <List /> 
          <List
            key={task._id}
            id={task._id} //on donne au props id la valeur de l'id de de l'objet de la base de donnée Mongo
            task={task.task} //task={task.task}= attribut task = element task et SA property task= valeur de l'input qui va donc s'afficher dans le browser quand on va addTask
            setUpdateUI={setUpdateUI} //Active setUpdateUi qui va re-toggle the updateUI variable and re-render the axios.get which update the task variable
            updateMode={updateMode} //Quand on va cliquer sur le crayon, ca va faire apparitre le text qu'on veut modifier dans l'input
          />
        ))}
      </ul>


    </main>
  )
}

export default App
