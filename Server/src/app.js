const express = require("express")
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const app = express()
const port = 3000

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'web_example_db';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})