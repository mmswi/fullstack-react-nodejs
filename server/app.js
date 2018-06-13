(async function() {
const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
// adding mongodb
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');


// routes
const routes = require('./routes/index');

// change this to something else if port 3000 is in use
const port = 3000;

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

// body parser for forms
app.use(bodyParser.urlencoded({extended: true}))


// server routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


var server = http.createServer(app);

// Db Connection URL
const dbUrl = 'mongodb://localhost:27017';

// Database Name
const dbName = 'reactFullStack';

// helper function for populating the db with some data
const insertTestUsers = async function(db) {
  // Get the documents collection
  const collection = db.collection('users');
  // Insert some documents
  return await collection.insertMany([
    {_id: 001, name : 'Mihai'}, {_id: 002, name : 'Ion'}
  ]);
}


// Using try catch block for mongodb connections
try {
  const client = await MongoClient.connect(dbUrl)
  console.log("Connected successfully to db");
  const db = client.db(dbName);
  const insertResult = await insertTestUsers(db)
  assert.equal(2, insertResult.result.n);
  assert.equal(2, insertResult.ops.length);
  console.log("Inserted 2 documents into the collection");

  server.listen(port);
  client.close();
} catch (e) {
  console.log("got mongodb init error: ", e)
}


server.on('listening', function() {
  console.log('listening on port ' + port);
})

server.on('error', function(error) {
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});


module.exports = app;
})();