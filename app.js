var express = require('express');
var jade = require('jade');
var path = require ('path');
var app = express();
//var facebook = require(__dirname + '/public/lib/facebook');

var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.set('views', __dirname + "/public/views/");
app.engine('jade', require('jade').__express);
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/levels'));

app.get('/', function(req, res) {
  console.log("Requesting from /");
  res.render('index');
});

app.get('/levels', function(req, res) {
  console.log("Requesting from levels");
  res.render('pages');
});

app.get('/game', function(req, res) {
  console.log("Requesting from game");
  var levelId = req.query.id;
  console.log(levelId || "No level defined");
  res.render('game', { id: levelId });
});

app.get('/map', function(req, res) {
});

app.listen(port);
console.log('Express server listening on port ' + port);
