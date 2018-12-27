const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const api = require("./routes/api");
const app = express();


var config = require('./config/db');

mongoose.connect(config.database, { promiseLibrary: require('bluebird'), useNewUrlParser:true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //res.render('index.html');
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
        
    // render the error page
    res.status(err.status || 500);
    res.render('index');
});


//module.exports = app;

app.listen(5600, () => console.log('Server started on port 5600 !!'))