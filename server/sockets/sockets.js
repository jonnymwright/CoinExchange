const socketIo = require('socket.io');
const createMatcher = require('../app/factory');
const uuidv4 = require('uuid/v4');

const sockets = http => {
  let orderBook;
  let matcher;
  let orderHistoryModel;
  let connectedSockets = [];
  let usersBySocket = {};
  const onTrade = trade => {
    connectedSockets.forEach(socket => {
      socket.emit('historic trades', orderHistoryModel.getHistoricalTrades(10));
      socket.emit('aggregated buys', orderBook.getAggregatedBuyOrders());
      socket.emit('aggregated sells', orderBook.getAggregatedSellOrders());
      if (usersBySocket[socket.id] === trade.recipient) {
          socket.emit('my sells', orderBook.getSellOrdersFor(usersBySocket[socket.id]));
          socket.emit('my buys', orderBook.getBuyOrdersFor(usersBySocket[socket.id]));
        }
    });
  };

  ({ matcher, orderBook, orderHistoryModel } = createMatcher(onTrade));
  const io = socketIo(http);
  io.on('connection', socket => {
    console.log('a user connected');
    connectedSockets.push(socket);

    socket.on('disconnect', () => {
      console.log('user disconnected');
      connectedSockets = connectedSockets.splice(
        connectedSockets.indexOf(socket),
        1
      );
      delete usersBySocket[socket.id];
    });

    socket.on('request initial data', () => {
      socket.emit('aggregated buys', orderBook.getAggregatedBuyOrders());
      socket.emit('aggregated sells', orderBook.getAggregatedSellOrders());
      socket.emit('historic trades', orderHistoryModel.getHistoricalTrades(10));
    });

    socket.on('receive trade', trade => {
      trade.uid = uuidv4();
      trade.quantity = Number(trade.quantity);
      trade.price = Number(trade.price);
      console.log(trade);
      switch (trade.action) {
        case 'buy':
          matcher.addNewBuy(trade);
          socket.emit('my buys', orderBook.getBuyOrdersFor(trade.user));
          socket.emit('aggregated buys', orderBook.getAggregatedBuyOrders());
          socket.broadcast.emit('aggregated buys', orderBook.getAggregatedBuyOrders());
          break;
        case 'sell':
          matcher.addNewSell(trade);
          socket.emit('my sells', orderBook.getSellOrdersFor(trade.user));
          socket.emit('aggregated sells', orderBook.getAggregatedSellOrders());
          socket.broadcast.emit('aggregated sells', orderBook.getAggregatedSellOrders());
          break;
        default:
          console.log('Unknown trade action: ', trade.action);
          console.log(trade);
      }
    });

    socket.on('change active user', newUser => {
      usersBySocket[socket.id] = newUser;
      socket.emit('my buys', orderBook.getBuyOrdersFor(newUser));
      socket.emit('my sells', orderBook.getSellOrdersFor(newUser));
    });
  });
  const socketPort = 4000;
  http.listen(socketPort, function() {
    console.log('Socket.io listening on port ' + socketPort);
  });
};

module.exports = sockets;
