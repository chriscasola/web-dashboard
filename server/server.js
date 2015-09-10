var path = require('path');
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var data = require('./data.json');

app.use(bodyParser.json());
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components/')));
app.use(express.static(path.join(__dirname, '../dist/')));

app.get('/tiles', function(req, res) {
  res.status(200).send(_.pluck(data.tiles, 'id'));
});

app.get('/tiles/:id', function(req, res) {
  res.status(200).send(_.findWhere(data.tiles, {id: parseInt(req.params.id)}));
});

app.post('/tiles/:id', function(req, res) {
  data.tiles[parseInt(req.params.id)] = req.body;
  res.status(200).send();
});

app.get('/layouts', function(req, res) {
  var layouts = _.map(data.layouts, function(layout) {
    return _.pick(layout, 'id', 'name');
  });
  res.status(200).send(layouts);
});

app.get('/layouts/:id/tiles', function(req, res) {
  var layout = _.findWhere(data.layouts, {id: req.params.id});
  res.status(200).send(layout.tiles);
});

app.get('/layouts/:id', function(req, res) {
  res.status(200).send(_.findWhere(data.layouts, {id: req.params.id}));
});

app.listen(3000, function() {
  console.log('server started');
});
