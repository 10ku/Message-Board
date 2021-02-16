import express from "express";
import cors from "cors";
import morgan from "morgan";
import MongoClient from "mongodb";
import assert from "assert";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'web_example_db';

MongoClient.connect(url, function(err, client)
{
	assert.strictEqual(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);
	const collection = db.collection('web_example_collection');
	var data = collection.find({}).toArray(function(err, docs) {
	assert.strictEqual(err, null);
	console.log("Found the following records");
	app.get('/', (req, res) => {
		res.json(docs)
	})
	console.log(docs)
	});
	client.close();
});



app.listen(port, () =>
{
	console.log(`Example app listening at http://localhost:${port}`)
})