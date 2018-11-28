class OrderModelHistory {
  constructor() {
    this.allTrades = [];
  }

  addTrade(trade) {
    this.allTrades.unshift({ ...trade, time: new Date() });
  }

  getHistoricalTrades(limit) {
    let result = this.allTrades;

    if (limit) {
      result = result.slice(0, limit)
    }

    return result;
  }
}
module.exports = OrderModelHistory;
