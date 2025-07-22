import './index.css';
import { useContext } from 'react';
import { ListOfTasks } from './components/ListOfTasks.jsx';
import { DateDisplay } from './components/Date.jsx';
import { ProgressSection } from './components/ProgressSection.jsx';
import { AddTaskSec } from './components/AddTask.jsx';
import { Footer } from './components/Footer.jsx';
import { useEffect } from 'react';
import { Context } from './context/Context.jsx';

function App() {
	const { getTasksFromDB } = useContext(Context);

	useEffect(() => {
		getTasksFromDB();
	});

	return (
		<main>
			<div className="app">
				<button style = {{"width" : "fit-content", 'margin' : '5px'}} onClick={getTasksFromDB}>Restart</button>
				<div className="topHalf">
					<DateDisplay />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<ProgressSection />
						<AddTaskSec />
					</div>
				</div>
				<ListOfTasks />
				<Footer />
			</div>
		</main>
	);
}

export default App;
