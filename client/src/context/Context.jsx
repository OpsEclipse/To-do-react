import { createContext, useCallback, useState } from 'react';
import axios from 'axios';

export const Context = createContext();
const taskPath = 'https://to-do-react-m3fc.onrender.com/task/';
const userPath = 'http://localhost:8080/user';

export const ContextProvider = (props) => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [loading, setLoading] = useState('');
	const [serverOff, setServerOff] = useState(false);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [userId, setUserId] = useState();
	const [isVerificationError, setIsVerificationError] =
		useState(false);
	const [displayName, setDisplayName] = useState("");

	const getTasksFromDB = useCallback(() => {
		axios
			.get(taskPath)
			.then((res) => {
				let taskList = res.data.map((task) => ({
					text: task.taskName,
					completed: task.isCompleted,
					_id: task._id,
				}));
				setTasks(taskList);
				setServerOff(false);
			})
			.catch((err) => {
				console.error(
					'error fetching data from database',
					err
				);
				setServerOff(true);
			});
	}, []);

	const appendTask = async () => {
		if (newTask.trim() !== '') {
			let data = { text: `${newTask.trim()} - ${displayName}`, completed: false };
			let _id = await addTaskToDB(data);
			setTasks((prev) => [...prev, { ...data, _id }]);
			setNewTask('');
		}
	};

	const addTaskToDB = async (data) => {
		let res = await axios.post(taskPath, {
			taskName: data.text,
		});
		return res.data.insertedId;
	};

	const completeTask = async (index, task) => {
		try {
			// Send update to backend
			await axios.patch(`${taskPath}${task._id}`, {
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
		}
	};

	const removeTask = async (task, index) => {
		try {
			setLoading(task._id);

			// Wait for the task to be deleted in the DB first
			await axios.delete(`${taskPath}${task._id}`);

			// After deletion succeeds, update local state
			setTasks((prev) => {
				const newTasks = [...prev];
				newTasks.splice(index, 1);
				return newTasks;
			});
		} catch (error) {
			console.error('Failed to delete task:', error);
		} finally {
			setLoading('');
		}
	};

	const userAuth = async (user, password) => {
		let req = {
			params: {
				user,
				password,
			},
		};
		try {
			let res = await axios.get(userPath, req);
			setPassword('');
			setUserId(res.data._id);
			setDisplayName(res.data.display);
			return true;
		} catch {
			console.log('error verifying user');
			setIsVerificationError(true);
			return false;
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
		serverOff,
		user,
		setUser,
		password,
		setPassword,
		userAuth,
		userId,
		setUserId,
		isVerificationError,
		displayName,
	};
	return (
		<Context.Provider value={contextValue}>
			{props.children}
		</Context.Provider>
	);
};
