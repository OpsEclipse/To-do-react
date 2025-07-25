import express from 'express';
import cors from 'cors';
import { connectToDB } from './db/connection.js';
import taskRoute from './routes/task.js';
import userRoute from './routes/user.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use('/task', taskRoute);
app.use('/user', userRoute);
const io = new Server(httpServer, {
	cors: {
		origin: [
			'http://localhost:5173',
			'https://to-do-react-1.onrender.com',
		],
	},
});

connectToDB()
	.then(() => {
		httpServer.listen(PORT, () => {
			console.log('server running');
		});

		io.on('connection', (socket) => {
			console.log('a user connected');

			socket.on('taskAdded', (task) => {
				console.log('task has been added');
				socket.broadcast.emit('addTask', task);
			});

			socket.on('completeTask', (index) => {
				console.log('task has been completed', index);
				socket.broadcast.emit('crossTask', index);
			});

			socket.on('deleteTask', (index) => {
				socket.broadcast.emit('taskDeleted', index);
			});
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
