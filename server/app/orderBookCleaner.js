const emitTrades = (trade, offers, onOrderBookUpdated) => {
  let quantity = trade.quantity;
  const offersCount = offers.length;
  for (let i = 0; i < offersCount && quantity > 0; i++) {
    const offer = offers[i];
    const tradeQuantity = Math.min(quantity, offer.quantity);
    offer.quantity -= tradeQuantity;

    if (onOrderBookUpdated) {
      onOrderBookUpdated();
    }

    quantity -= tradeQuantity;
  }

  return offers.filter(offer => offer.quantity > 0);
};

const removeBuysFromOrderBook = (trade, orderBookModel, onOrderBookUpdated) => {
  let offers = orderBookModel.getBuyOffer(trade.price);

  offers = emitTrades(trade, offers, onOrderBookUpdated);

  delete orderBookModel.buyOrders[trade.price];
  orderBookModel.buyPrices.remove(trade.price);
  offers.forEach(offer => orderBookModel.addBuy(offer));
};

const removeSellsFromOrderBook = (
  trade,
  orderBookModel,
  onOrderBookUpdated
) => {
  let offers = orderBookModel.getSellOffer(trade.price);

  offers = emitTrades(trade, offers, onOrderBookUpdated);

  delete orderBookModel.sellOrders[trade.price];
  orderBookModel.sellPrices.remove(trade.price);
  offers.forEach(offer => orderBookModel.addSell(offer));
};

module.exports = { removeBuysFromOrderBook, removeSellsFromOrderBook };
