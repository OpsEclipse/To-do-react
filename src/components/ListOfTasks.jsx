import {ListItem} from "./ListItem.jsx"
import "../index.css";


export const ListOfTasks = ({tasks, setTasks}) => {
    
    return(
        <ul>
            {tasks.map((task, index) => (
                <ListItem 
                    key={index}
                    task={task}
                    index={index}
                    setTasks={setTasks}
                />
            ))}

        </ul>
    );
}