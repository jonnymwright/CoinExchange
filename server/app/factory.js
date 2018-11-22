const Matcher = require("./matcher");
const OrderBookModel = require("./orderBookModel");
const { removeBuysFromOrderBook, removeSellsFromOrderBook } = require("./orderBookCleaner");
var EventEmitter = require("events").EventEmitter;

const createMatcher = () => {
  const orderBook = new OrderBookModel();
  const matchEmitter = new EventEmitter();
  const tradeEmitter = new EventEmitter();
  const matcher = new Matcher(orderBook, 
    match => matchEmitter.emit("sell", match), 
    match => matchEmitter.emit("buy", match)
  );
  matchEmitter.on("sell", trade => {
    removeBuysFromOrderBook(trade, orderBook, trade =>
      tradeEmitter.emit("trade", trade)
    );
  });
  matchEmitter.on("buy", trade => {
    removeSellsFromOrderBook(trade, orderBook, trade =>
      tradeEmitter.emit("trade", trade)
    );
  });

  return { matcher, orderBook, tradeEmitter };
};

module.exports = createMatcher;
