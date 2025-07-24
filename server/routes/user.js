import express from 'express';
import { db } from '../db/connection.js';
import { ObjectId } from 'mongodb';

const route = express.Router();


route.get('/', async (req, res) => {
	let collection = await db.collection('users');
	const { user, password } = req.query;
	let userInfo = {
		user,
		password,
	};
	const result = await collection.findOne(userInfo);

	if (result) {
		res.status(200).send(result);
	} else {
		res.status(404).send('user not found');
	}
});

route.post('/', async (req, res) => {
    let collection = await db.collection('users');
	const { user, password, display, role } = req.body;
    let userInfo = {
		user,
		password,
		display,
		role: role || "user",
	};
    let results = await collection.insertOne(userInfo);
	res.status(201).send(results);
})



export default route;
