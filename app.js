var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  require('/src/server')
  next();
}

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
})
app.listen(3000);

