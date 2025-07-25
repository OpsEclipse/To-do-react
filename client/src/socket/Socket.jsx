import { io } from 'socket.io-client';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';

const socket = io('https://to-do-react-m3fc.onrender.com');
export const Socket = () => {
    const {setNewTask, setTasks} = useContext(Context);
    useEffect(() => {
		socket.on('crossTask', (index) => {
			setTasks((prev) => {
				const newTasks = [...prev];
				newTasks[index] = {
					...newTasks[index],
					completed: !newTasks[index].completed,
				};
				return newTasks;
			});
		});
		socket.on('addTask', (task) => {
			const { data, _id } = task;
			setTasks((prev) => [...prev, { ...data, _id }]);
			setNewTask('');
		});
        socket.on('taskDeleted', (index) => {
            setTasks((prev) => {
				const newTasks = [...prev];
				newTasks.splice(index, 1);
				return newTasks;
			});
        })
		return () => {
			socket.off('crossTask');
			socket.off('addTask');
		};
	});
    return null
}


export default socket;
