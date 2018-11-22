const Matcher = require("./matcher");
const OrderBookModel = require("./orderBookModel");
const {
  removeBuysFromOrderBook,
  removeSellsFromOrderBook
} = require("./orderBookCleaner");
var EventEmitter = require("events").EventEmitter;

const createMatcher = tradeEmitterCallback => {
  const orderBook = new OrderBookModel();
  const matchEmitter = new EventEmitter();
  const matcher = new Matcher(
    orderBook,
    match => matchEmitter.emit("sell", match),
    match => matchEmitter.emit("buy", match)
  );
  matchEmitter.on("sell", trade => {
    removeBuysFromOrderBook(trade, orderBook, trade => {
      if (tradeEmitterCallback) {
        tradeEmitterCallback(trade);
      }
    });
  });
  matchEmitter.on("buy", trade => {
    removeSellsFromOrderBook(trade, orderBook, trade => {
      if (tradeEmitterCallback) {
        tradeEmitterCallback(trade);
      }
    });
  });

  return { matcher, orderBook };
};

module.exports = createMatcher;
