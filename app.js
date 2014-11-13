var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/levels'));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(3000);
