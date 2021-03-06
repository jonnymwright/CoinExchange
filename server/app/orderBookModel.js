var SortedSet = require("js-sorted-set");

const sumQuantity = (offers) => {
  return offers.reduce(
    (accumulator, offer) => accumulator + offer.quantity,
    0
  )
};

// exampleOrderBook = {
//   buyOrders: {
//     5 : {
//       price: 5,
//       orders: [
//         ...
//       ]
//     },
//     6 : {
//       price: 6,
//       orders: [
//         ...
//       ]
//     },
//     4 : {
//       price: 4,
//       orders: [
//         ...
//       ]
//     }
//   },
//   buyPrices: [4, 5, 6] - always in order
//   sells ...
// }

class OrderBookModel {
  constructor(buyOrders = {}, sellOrders = {}) {
    this.buyOrders = buyOrders;
    this.buyPrices = new SortedSet({ comparator: (a, b) => b - a });
    this.buyPrices.peek = () => this.buyPrices.beginIterator().value();
    this.sellOrders = sellOrders;
    this.sellPrices = new SortedSet();
    this.sellPrices.peek = () => this.sellPrices.beginIterator().value();

    this.addSell = this.addSell.bind(this);
    this.addBuy = this.addBuy.bind(this);
    this.getAggregatedBuyOrders = this.getAggregatedBuyOrders.bind(this);
    this.getAggregatedSellOrders = this.getAggregatedSellOrders.bind(this);
    this.getBestBuyOffer = this.getBestBuyOffer.bind(this);
    this.getBestSellOffer = this.getBestSellOffer.bind(this);
  }

  getAggregatedBuyOrders() {
    return this.buyPrices.map(price => ({
      price: price,
      quantity: sumQuantity(this.buyOrders[price].orders)
    }));
  }

  getAggregatedSellOrders() {
    return this.sellPrices.map(price => ({
      price: price,
      quantity: sumQuantity(this.sellOrders[price].orders)
    }));
  }

  addBuy(buy) {
    let buysAtThisPrice = this.buyOrders[buy.price];
    if (!buysAtThisPrice) {
      buysAtThisPrice = { price: buy.price, orders: [] };
      this.buyOrders[buy.price] = buysAtThisPrice;
      this.buyPrices.insert(buy.price);
    }
    buysAtThisPrice.orders.push(buy);
  }

  addSell(sell) {
    let sellsAtThisPrice = this.sellOrders[sell.price];
    if (!sellsAtThisPrice) {
      sellsAtThisPrice = { price: sell.price, orders: [] };
      this.sellOrders[sell.price] = sellsAtThisPrice;
      this.sellPrices.insert(sell.price);
    }
    sellsAtThisPrice.orders.push(sell);
  }

  getBestBuyOffer() {
    if (this.buyPrices.length === 0) return;

    const price = this.buyPrices.peek();
    const orders = this.buyOrders[price].orders;
    return {
      price,
      orders
    };
  }

  getBuyOffer(price) {
    if (!this.buyOrders[price]) return;
    return this.buyOrders[price].orders;
  }

  getBestSellOffer() {
    if (this.sellPrices.length === 0) return;

    const price = this.sellPrices.peek();
    const orders = this.sellOrders[price].orders;
    return {
      price,
      orders
    };
  }

  getSellOffer(price) {
    if (!this.sellOrders[price]) return;
    return this.sellOrders[price].orders;
  }

  getSellOrdersFor(user) {
    return this.getOrdersFor(user, this.sellPrices, this.sellOrders);
  }

  getBuyOrdersFor(user) {
    return this.getOrdersFor(user, this.buyPrices, this.buyOrders);
  }

  getOrdersFor(user, prices, orders) {
    let result = prices.map((price) => {
      return orders[price].orders.filter(order => order.user === user);
    });
    result = result.filter(offers => offers.length !== 0);
    result = result.map(offers => ({
      price: offers[0].price, 
      quantity: sumQuantity(offers),
      user: offers[0].user
    }));
    return result;
  }
}

const getAggregatedBuyOrders = () => {
  return [
    {
      price: 11,
      quantity: 5
    },
    {
      price: 12,
      quantity: 7
    },
    {
      price: 15,
      quantity: 8
    }
  ];
};

const getAggregatedSellOrders = () => {
  return [
    {
      price: 9,
      quantity: 35
    },
    {
      price: 8,
      quantity: 40
    }
  ];
};

module.exports = OrderBookModel;
