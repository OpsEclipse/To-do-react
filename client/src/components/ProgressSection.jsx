import { useContext } from "react";
import "../index.css";
import { ProgressBar } from "./ProgressBar";
import { Context } from "../Context/context";

export const ProgressSection = () => {
    const {tasks, setTasks} = useContext(Context)
    const progress = (tasks.filter(task => task.completed).length) / tasks.length

    return (
        <div className="progressSection">
            <h2 style={{ textAlign: "center" }}>Progression</h2>
            <ProgressBar progress={progress} />
        </div>
    )
}

