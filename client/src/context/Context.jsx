import { createContext, useState } from "react";
import axios from "axios";
export const Context = createContext();
const path = 'https://to-do-react-m3fc.onrender.com/task/'

export const ContextProvider = (props) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
	const [loading, setLoading] = useState(false);

    const getTasksFromDB = () => {
		axios
			.get(path)
			.then((res) => {
				let taskList = res.data.map((task) => ({
					text: task.taskName,
					completed: task.isCompleted,
					_id: task._id,
				}));
				setTasks(taskList);
			})
			.catch((err) => {
				console.error(
					'error fetching data from database',
					err
				);
			});
	};


    const appendTask = async () => {
		if (newTask.trim() !== '') {
			let data = { text: newTask.trim(), completed: false };
			let _id = await addTaskToDB(data);
			setTasks((prev) => [...prev, { ...data, _id }]);
			setNewTask('');
		}
	};

	const addTaskToDB = async (data) => {
		let res = await axios.post(path, {
			taskName: data.text,
		});
		return res.data.insertedId;
	};

    const completeTask = async (index, task) => {
		try {
			setLoading(true);

			// Send update to backend
			await axios.patch(`${path}${task._id}`, {
				isCompleted: !task.completed,
			});

			// Once backend confirms, update local state
			setTasks((prev) => {
				const newTasks = [...prev];
				newTasks[index] = {
					...newTasks[index],
					completed: !newTasks[index].completed,
				};
				return newTasks;
			});
		} catch (error) {
			console.error('Failed to update task completion:', error);
		} finally {
			setLoading(false);
		}
	};


    const removeTask = async (task, index) => {
		try {
			setLoading(true);

			setTasks((prev) => {
			

			// Wait for the task to be deleted in the DB
			await axios.delete(`${path}${task._id}`);

			// After deletion succeeds, update local state
			const newTasks = [...prev];
			newTasks.splice(index, 1);
			return newTasks;
		});
		} catch (error) {
			console.error('Failed to delete task:', error);
		} finally {
			setLoading(false);
		}
	};

    
    const contextValue = {
		tasks,
		setTasks,
		appendTask,
		addTaskToDB,
		getTasksFromDB,
        removeTask,
        newTask,
        setNewTask,
        completeTask,
		loading,
		setLoading,
	};
    return (
		<Context.Provider value={contextValue}>
			{props.children}
		</Context.Provider>
	);
}
