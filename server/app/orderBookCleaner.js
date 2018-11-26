const emitTrades = (trade, offers) => {
  let quantity = trade.quantity;
  const resultantTrades = [];
  const offersCount = offers.length;
  for (let i = 0; i < offersCount && quantity > 0; i++) {
    const offer = offers[i];
    const tradeQuantity = Math.min(quantity, offer.quantity);
    offer.quantity -= tradeQuantity;

    
      const result = {
        quantity,
        price: trade.price,
        initiator: trade.user,
        recipient: offer.user
      }
      resultantTrades.push(result);
    

    quantity -= tradeQuantity;
  }

  const newOffers = offers.filter(offer => offer.quantity > 0)
  return {newOffers, resultantTrades};
};

const removeBuysFromOrderBook = (trade, orderBookModel, onOrderBookUpdated) => {
  const offers = orderBookModel.getBuyOffer(trade.price);

  ({newOffers, resultantTrades} = emitTrades(trade, offers));

  delete orderBookModel.buyOrders[trade.price];
  orderBookModel.buyPrices.remove(trade.price);
  newOffers.forEach(offer => orderBookModel.addBuy(offer));
  resultantTrades.forEach(trade => onOrderBookUpdated(trade));
};

const removeSellsFromOrderBook = (
  trade,
  orderBookModel,
  onOrderBookUpdated
) => {
  let offers = orderBookModel.getSellOffer(trade.price);

  ({newOffers, resultantTrades} = emitTrades(trade, offers));

  delete orderBookModel.sellOrders[trade.price];
  orderBookModel.sellPrices.remove(trade.price);
  newOffers.forEach(offer => orderBookModel.addSell(offer));
  resultantTrades.forEach(trade => onOrderBookUpdated(trade));
};

module.exports = { removeBuysFromOrderBook, removeSellsFromOrderBook };
