import React from 'react'

import {BsTrash} from "react-icons/bs";
import {BiEditAlt} from "react-icons/bi";

export const List = ({id, task,setUpdateUI,  updateMode, }) => {
  return (
    <li>
      {task}
      <div className="icone_holder">
        <BiEditAlt className='icon'/>
        <BsTrash className='icon'/>
      </div>
    </li>
  )
};
