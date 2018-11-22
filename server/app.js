var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);

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


const demoData = [
  {
    price: 10,
    quantity: 50,
    time: new Date(2018, 10, 15, 8, 17, 0)
  },
  {
    price: 11,
    quantity: 70,
    time: new Date(2018, 10, 15, 8, 13, 0)
  },
  {
    price: 10,
    quantity: 80,
    time: new Date(2018, 10, 15, 8, 10, 0)
  }
];
io.on('connection', function(socket){
  console.log('a user connected');
  setTimeout(() => {socket.emit('recent trades', demoData);}, 5000);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
const socketPort = 4000;
http.listen(socketPort, function() {
  console.log("Socket.io listening on port " + socketPort);
});
