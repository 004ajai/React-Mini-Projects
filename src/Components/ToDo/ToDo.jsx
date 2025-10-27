import React,{useState} from 'react';
import './ToDo.css';

export default function ToDo() {

    const [task , setTask] = useState([]);
    const [taskInput , setTaskInput] = useState("");

    const addTask=()=>{
        const t = taskInput.trim();
        if (!t){
            alert("please enter a task!");
            return;
        }
        setTask([...task , {text:t , completed:false}]);
        setTaskInput("");
    };

    const toggleDone = (i)=>{
        const newTask=[...task];
        newTask[i].completed=!newTask[i].completed;
        setTask(newTask);
    };

    const deleteTask = (d)=>{
        const newTask = task.filter((_ , i ) =>i!==d);
        setTask(newTask);
    };



    return (
        <div className='Container'>
            <h1>ToDo App</h1>
            <div className="box">
            <input value={taskInput} onChange={(e)=> setTaskInput(e.target.value)} placeholder='Enter A Task' />
            <button onClick={addTask}>Add</button>

            <ul>
                {task.map((t , i) =>(
                    <li key={i} className={t.completed ? "completed" : ""}>
                    <span>{t.text}</span>
                    <button className="done-btn" onClick={()=>toggleDone(i)}>Done</button>
                    <button className="delete-btn" onClick={()=>deleteTask(i)}>Delete</button>
                    </li>
                ))}
                
            </ul>
            </div>
            
        </div>
    )
}
