import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = process.env.ATLAS_URI || '';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export let db;

export const connectToDB = async () => {
    if (db) return db;
	await client.connect();
	await client.db('admin').command({ ping: 1 });
	console.log(
		'Pinged your deployment. You successfully connected to MongoDB!'
	);
	db = await client.db('task_manager');
};

process.on('SIGINT', async () => {
	await client.close();
	console.log('database connection successfully terminated');
	process.exit(0);
});
