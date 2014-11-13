var express = require('express');
var jade = require('jade');
var path = require ('path');
var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/levels'));

app.get('/', function(req, res) {
  console.log("Requesting from /");
  res.send('index');
});

app.get('/levels', function(req, res) {
  console.log("Requesting from levels");
  res.send('pages');
});

app.get('/game', function(req, res) {
  console.log("Requesting from game");
  var levelId = req.query.id;
  console.log(levelId || "No level defined");
  res.send('game', { id: levelId }, function(err, html) {
    if (err) {
      console.error(err);
    }
  });
});

app.listen(3000);
