import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.ATLAS_URI || '';

// Create a MongoClient with Stable API version and TLS enabled
const client = new MongoClient(uri, {
	tls: true, // <-- TLS enabled here at top-level options
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
	db = client.db('task_manager');
	return db;
};

process.on('SIGINT', async () => {
	await client.close();
	console.log('database connection successfully terminated');
	process.exit(0);
});
