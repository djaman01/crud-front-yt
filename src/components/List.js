import axios from 'axios'

import {BsTrash} from "react-icons/bs";
import {BiEditAlt} from "react-icons/bi";
import { baseURL } from '../utils/constant';

const List = ({id, task, setUpdateUI,  updateMode }) => {

  const removeTask= () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res)=>{//We pass the id from App.js 
      console.log(res);
      setUpdateUI((prevState)=>!prevState) // used to toggle the value of the updateUI state variable in the List component, so that the axios.get re-render when we remove and updates the task object when we remove or add, and so the UI (ecriture dans le browser de ce qu'on a delete) will be changed
    }); 
  };

  const handleUpdateMode = () => updateMode(id, task);

  return (
    <li>
      {task}
      <div className="icone_holder">
        <BiEditAlt className='icon' onClick={handleUpdateMode}/> 
        {/* updateMode est une arrow function construite dans App.js et passé au props dans le component list de App.js */}
        <BsTrash className='icon' onClick={removeTask}/>
      </div>
    </li>
  )
};

export default List;
