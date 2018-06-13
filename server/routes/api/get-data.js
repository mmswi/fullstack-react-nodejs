'use strict'
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
// Get Digital Subscription page
    module.exports = async function (req, res) {
        try {
            const dbUrl = 'mongodb://localhost:27017';
            const dbName = 'reactFullStack';
            const client = await MongoClient.connect(dbUrl)
            console.log("Connected successfully to db to get users");
            const db = client.db(dbName);
            // Get the users collection
            const collection = db.collection('users');
            const users = await collection.find({}).toArray()
            console.log("Found the following records");
            console.log(users);
            client.close();
        } catch (e) {
            console.log('get from mongodb error: ', e)
        }
        
    }
