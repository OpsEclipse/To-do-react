import express from 'express';
import cors from 'cors';
import { connectToDB } from './db/connection.js';
import taskRoute from './routes/task.js';
import userRoute from './routes/user.js';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/task', taskRoute);
app.use('/user', userRoute);

connectToDB()
	.then(
		app.listen(PORT, () => {
			console.log('server running');
		})
	)
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
