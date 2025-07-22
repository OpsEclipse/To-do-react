import { useContext } from 'react';
import '../index.css';
import { ProgressBar } from './ProgressBar';
import { Context } from '../Context/context';

export const ProgressSection = () => {
	const { tasks } = useContext(Context);
	let progress;
	if (tasks.length === 0) {
		progress = 0;
	} else {
		progress =
			tasks.filter((task) => task.completed).length /
			tasks.length;
	}
	return (
		<div className="progressSection">
			<h2 style={{ textAlign: 'center' }}>Progression</h2>
			<ProgressBar progress={progress} />
		</div>
	);
};
