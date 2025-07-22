import '../index.css';
import leavesImg from '../assets/leaves.png';
import { useContext } from 'react';
import { Context } from '../Context/context';

export const ListItem = ({ task, index }) => {
	const {removeTask, completeTask} = useContext(Context);

	
	return (
		<div className="listItem">
			<div
				style={{ display: 'flex', gap: '20px' }}
				onClick={() => completeTask(index, task)}
			>
				<img
					src={leavesImg}
					alt="leaves"
					className="leafIcon"
				/>
				<p
					className={`task-text ${
						task.completed ? 'completed' : ''
					}`}
				>
					{task.text}
				</p>
			</div>
			<p
				onClick={() => removeTask(task, index)}
				style={{ padding: '4px' }}
			>
				x
			</p>
		</div>
	);
};
