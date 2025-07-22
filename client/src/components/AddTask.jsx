import { Context } from '../Context/context';
import '../index.css';
import { useContext } from 'react';

export const AddTaskSec = () => {
	const { newTask, setNewTask, appendTask } = useContext(Context)

	return (
		<div className="addTaskSec">
			<div className="searchBar">
				<input
					type="text"
					className="search"
					placeholder="Write your task here..."
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							appendTask();
						}
					}}
				/>
			</div>

			<button onClick={appendTask}>+</button>
		</div>
	);
};
