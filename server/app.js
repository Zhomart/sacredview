const express = require('express')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const config = require('./config')
const runs = require('./routes/runs');

var database;

const app = express()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));

app.use((req, res, next) => {
  req.database = database
  next()
})

app.use('/api/runs', runs);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(JSON.stringify({
    'message': err.message,
    'error': error,
  }));
});

MongoClient.connect(config.mongodb.uri, (err, _database) => {
  database = _database;

  app.listen(config.port, () => {
    console.log('Listening port ' + config.port)
  })
})
