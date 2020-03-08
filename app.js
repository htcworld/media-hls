var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  require('./src/server')
  next();
}

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
})
var port = process.env.PORT || 3000;
app.listen(port);
