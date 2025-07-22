import { ListItem } from './ListItem.jsx';
import '../index.css';
import { useContext } from 'react';
import { Context } from '../context/Context.jsx';

export const ListOfTasks = () => {
	const { tasks } = useContext(Context);
	return (
		<ul>
			{tasks.map((task, index) => (
				<ListItem
					key={task._id}
					task={task}
					index={index}
				/>
			))}
		</ul>
	);
};
