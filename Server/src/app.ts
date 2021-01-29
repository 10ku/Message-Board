import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");
import morgan = require("morgan");
import MongoClient = require("mongodb");
import assert = require("assert");

const app = express();
app.use(bodyParser.json());
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