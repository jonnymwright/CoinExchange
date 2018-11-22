var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var sockets = require("./sockets/sockets.js");
var app = express();
var http = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3001");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

routes(app);

var server = app.listen(3000, function() {
  console.log("REST app listening on port ", server.address().port);
});

sockets(http);
