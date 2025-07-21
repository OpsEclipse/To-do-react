import "../index.css";
import leavesImg from "../assets/leaves.png";

export const ListItem = ({task, index ,setTasks}) => {
    return (
        <div className="listItem" onClick={() => {
            setTasks(prev => {
                const newTasks = [...prev];
                newTasks[index] = {...newTasks[index], completed: !newTasks[index].completed}
                console.log(newTasks[index].completed)
                return newTasks;
            })
        }}>
            <img src={leavesImg} alt="leaves" className="leafIcon"/>
            <p className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</p>
        </div>
    );
};