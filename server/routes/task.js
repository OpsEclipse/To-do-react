import express from 'express';
import { db } from '../db/connection.js';
import { ObjectId } from 'mongodb';

const route = express.Router();

route.get('/', async (req, res) => {
	let collection = await db.collection('tasks');
	let results = await collection.find({}).toArray();
	res.status(200).send(results);
});

route.get('/:id', async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
	let collection = await db.collection('tasks');
	let results = await collection.findOne(query);
	res.status(200).send(results);
});

route.post('/', async (req, res) => {
	let collection = await db.collection('tasks');
	let newTask = {
		taskName: req.body.taskName,
		isCompleted: req.body.isCompleted || false,
	};
	let results = await collection.insertOne(newTask);
	res.status(201).send(results);
});

route.patch('/:id', async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
	let collection = await db.collection('tasks');
    const { taskName, isCompleted } = req.body;
    let updates = {}
    if (taskName !== undefined) updates.taskName = taskName;
    if (isCompleted !== undefined) updates.isCompleted = isCompleted;
    let updatedTask = {
        $set : updates
    }
    let results = await collection.updateOne(query, updatedTask);
    res.status(200).send(results)
});

route.delete('/', async (req, res) => {
    let collection = await db.collection('tasks');
	let results = await collection.deleteMany({});
    res.status(201).send(results);
})

route.delete('/:id', async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
	let collection = await db.collection('tasks');
    let results = await collection.deleteOne(query);
    res.status(201).send(results);
})

export default route;
