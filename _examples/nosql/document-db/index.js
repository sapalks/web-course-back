const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

// Connection URL
const url = 'mongodb://root:rootpassword@localhost:27017';

// Database Name
const dbName = 'db_test';
const client = new MongoClient(url);
// Use connect method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function (err, result) {
        console.log('Inserted 3 documents into the collection');
        console.log(result);
    });
    collection.updateMany(
        { a: 1 },
        { $set: { b: 3 } });

    client.close();
});