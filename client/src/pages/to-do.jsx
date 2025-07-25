import { useContext } from 'react';
import { ListOfTasks } from '../components/ListOfTasks.jsx';
import { DateDisplay } from '../components/Date.jsx';
import { ProgressSection } from '../components/ProgressSection.jsx';
import { AddTaskSec } from '../components/AddTask.jsx';
import { Footer } from '../components/Footer.jsx';
import { useEffect } from 'react';
import { Context } from '../context/Context.jsx';
import { Socket } from '../socket/Socket.jsx';

export const Task = () => {
	const { getTasksFromDB, serverOff, displayName } =
		useContext(Context);

	useEffect(() => {
		getTasksFromDB();
	}, [])

	return (
		<main>
			<h1 className='title'>{`Welcome ${displayName}!`}</h1>
			<div className="app">
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
				{!serverOff ? (
					<ListOfTasks />
				) : (
					<h2>Try again in 30 seconds, server off</h2>
				)}

				<Footer />
			</div>
			<Socket />
		</main>
	);
};
