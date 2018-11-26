class Matcher {
  constructor(orderBookModel, onSellMatched, onBuyMatched) {
    this.orderBookModel = orderBookModel;
    this.onSellMatched = onSellMatched;
    this.onBuyMatched = onBuyMatched;
  }

  addNewBuy(buy) {
    this.addNewTrade(
      buy,
      (a, b) => a <= b,
      () => this.orderBookModel.getBestSellOffer(),
      this.orderBookModel.addBuy,
      this.onBuyMatched
    );
  }

  addNewSell(sell) {
    this.addNewTrade(
      sell,
      (a, b) => a >= b,
      () => this.orderBookModel.getBestBuyOffer(),
      this.orderBookModel.addSell, 
      this.onSellMatched
    );
  }

  addNewTrade(trade, priceComparison, existingOrders, addToOrderBook, onTradeMatched) {
    let quantity = trade.quantity;
    let bestOffer = existingOrders();
    while (
      quantity > 0 &&
      bestOffer &&
      priceComparison(bestOffer.price, trade.price)
    ) {
      const available = bestOffer.orders.reduce(
        (accumulator, offer) => accumulator + offer.quantity,
        0
      );
      const tradeQuantity = Math.min(quantity, available);
      onTradeMatched({
        price: bestOffer.price,
        quantity: tradeQuantity,
        user: trade.user
      });
      quantity -= tradeQuantity;
      bestOffer = existingOrders();
    }

    if (quantity > 0) {
      addToOrderBook({ ...trade, quantity });
    }
  }
}

module.exports = Matcher;
