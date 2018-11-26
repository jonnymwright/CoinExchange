const Matcher = require("./matcher");
const OrderBookModel = require("./orderBookModel");
const {
  removeBuysFromOrderBook,
  removeSellsFromOrderBook
} = require("./orderBookCleaner");
const OrderHistoryModel = require("./orderHistoryModel");
var EventEmitter = require("events").EventEmitter;

const createMatcher = tradeEmitterCallback => {
  const orderBook = new OrderBookModel();
  const matchEmitter = new EventEmitter();
  const orderHistoryModel = new OrderHistoryModel();
  const matcher = new Matcher(
    orderBook,
    match => matchEmitter.emit("sell", match),
    match => matchEmitter.emit("buy", match)
  );
  matchEmitter.on("sell", trade => {
    orderHistoryModel.addTrade({ ...trade, time: new Date() });
    removeBuysFromOrderBook(trade, orderBook, trade => {
      if (tradeEmitterCallback) {
        tradeEmitterCallback(trade);
      }
    });
  });
  matchEmitter.on("buy", trade => {
    orderHistoryModel.addTrade({ ...trade, time: new Date() });
    removeSellsFromOrderBook(trade, orderBook, trade => {
      if (tradeEmitterCallback) {
        tradeEmitterCallback(trade);
      }
    });
  });

  return { matcher, orderBook, orderHistoryModel };
};

module.exports = createMatcher;
