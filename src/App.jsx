import './index.css';

import { useState } from "react";
import { ListOfTasks } from "./components/ListOfTasks.jsx";
import { DateDisplay } from "./components/Date.jsx";
import { ProgressSection } from './components/ProgressSection.jsx';
import { AddTaskSec } from './components/AddTask.jsx';
import { Footer } from './components/Footer.jsx';


function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <main>
      <div className="app">
        <div className="topHalf">
          <DateDisplay />
          <div style={{display: "flex", flexDirection: "column"}}>
            <ProgressSection tasks={tasks} setTasks = {setTasks}/>
            <AddTaskSec tasks={tasks} setTasks = {setTasks}/>
          </div>
        </div>
        <ListOfTasks tasks={tasks} setTasks = {setTasks}/>
        <Footer />
      </div>
    </main>
  );
}

export default App;
