const socketIo = require("socket.io");
const createMatcher = require("../app/factory");

const sockets = http => {
  let orderBook;
  let connectedSockets = [];
  const onTrade = trade => {
    connectedSockets.forEach(socket => {
      socket.emit("aggregated buys", orderBook.getAggregatedBuyOrders());
      socket.emit("aggregated sells", orderBook.getAggregatedSellOrders());
    });
  };

  ({ orderBook } = createMatcher(onTrade));
  const io = socketIo(http);
  io.on("connection", (socket) => {
    console.log("a user connected");
    connectedSockets.push(socket);

    socket.on("disconnect", () => {
      console.log("user disconnected");
      connectedSockets = connectedSockets.splice(connectedSockets.indexOf(socket), 1);
    });

    socket.on("request initial data", () => {
      socket.emit("aggregated buys", orderBook.getAggregatedBuyOrders());
      socket.emit("aggregated sells", orderBook.getAggregatedSellOrders());
    })
  });
  const socketPort = 4000;
  http.listen(socketPort, function() {
    console.log("Socket.io listening on port " + socketPort);
  });
};

module.exports = sockets;
