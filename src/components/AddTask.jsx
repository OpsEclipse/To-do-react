import "../index.css";
import { useState } from "react";

export const AddTaskSec = ({tasks, setTasks}) => {
    const [newTask, setNewTask] = useState("");
    
    
    const appendTask = () => {
        if (newTask.trim() !== "") {
            setTasks(prev => [...prev, { text: newTask.trim(), completed: false }]);
            setNewTask("");
            
        }
    }

    return(
        <div className="addTaskSec">
            <div className="searchBar">
                <input
                    type="text"
                    className="search"
                    placeholder="Write your task here..."
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e=> {
                        if (e.key === 'Enter') {
                            appendTask();
                        }
                    }}
                />
            </div>

            <button onClick = {appendTask}>+</button>
        </div>
    )
}