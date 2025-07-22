import '../index.css';
import leavesImg from '../assets/leaves.png';
import { useContext } from 'react';
import { Context } from '../context/Context';

export const ListItem = ({ task, index }) => {
	const { removeTask, completeTask, loading } = useContext(Context);

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
				{loading !== task._id ? (
					<p
						className={`task-text ${
							task.completed ? 'completed' : ''
						}`}
					>
						{task.text}
					</p>
				) : null}
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
