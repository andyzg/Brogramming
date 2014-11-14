var express = require('express');
var jade = require('jade');
var path = require ('path');
var app = express();

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

app.get('/map/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    console.error("ERROR: No id provided in request");
    res.send(200);
  }
  var fileName = __dirname + "/public/levels/level_" + id + ".json";
  console.log("File being requested is " + fileName);
  res.sendFile(fileName);
});

app.listen(port);
console.log("Listening on port: " + port );
