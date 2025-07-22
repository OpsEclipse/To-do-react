import { createContext, useState } from "react";
import axios from "axios";
export const Context = createContext();
const path = 'https://to-do-react-m3fc.onrender.com/task/'

export const ContextProvider = (props) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

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

    const completeTask = (index, task) => {
		setTasks((prev) => {
			const newTasks = [...prev];
			newTasks[index] = {
				...newTasks[index],
				completed: !newTasks[index].completed,
			};
			console.log(newTasks[index].completed);
			axios.patch(`${path}${task._id}`, {
				isCompleted: !task.completed,
			});

			return newTasks;
		});
	};

    const removeTask = (task, index) => {
		setTasks((prev) => {
			const newTasks = [...prev];
			newTasks.splice(index, 1);

			axios.delete(`${path}${task._id}`);

			return newTasks;
		});
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
	};
    return (
		<Context.Provider value={contextValue}>
			{props.children}
		</Context.Provider>
	);
}
