class OrderModelHistory {
  constructor() {
    this.allTrades = [];
  }

  addTrade(trade) {
    this.allTrades.unshift({ ...trade, time: new Date() });
  }

  getHistoricalTrades(count = 10) {
    return this.allTrades.slice(0, count);
  }
}
module.exports = OrderModelHistory;
