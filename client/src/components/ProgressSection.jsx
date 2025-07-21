import "../index.css";
import { ProgressBar } from "./ProgressBar";

export const ProgressSection = ({tasks, setTasks}) => {
    
    const progress = (tasks.filter(task => task.completed).length) / tasks.length

    return (
        <div className="progressSection">
            <h2 style={{ textAlign: "center" }}>Progression</h2>
            <ProgressBar progress={progress} />
        </div>
    )
}

