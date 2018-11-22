const Matcher = require("../app/matcher");

describe("Matcher", () => {
  let matcher;
  let orderBookMock = {};
  let matchFoundHandler;
  let onMatchFound = (trade) => {
    matchFoundHandler(trade);
  };

  beforeEach(() => {
    matcher = new Matcher(orderBookMock, onMatchFound, onMatchFound);
    tradeEmitter = matcher.tradeEmitter;
  });

  // adding a buy
  it("can add a new buy", () => {
    matchFoundHandler = () => {
      throw new Error("A trade should not be found");
    };
    let receivedBuy;
    orderBookMock.addBuy = buy => {
      receivedBuy = buy;
    };
    orderBookMock.getBestSellOffer = () => undefined;
    const buy = {
      price: 5,
      quantity: 10,
      uid: "id1"
    };

    matcher.addNewBuy(buy);

    expect(receivedBuy).toEqual(buy);
  });

  it("does not match a buy with a sell if the price is not compatible", () => {
    matchFoundHandler = () => {
      throw new Error("A trade should not be found");
    };
    let receivedBuy;
    orderBookMock.addBuy = buy => {
      receivedBuy = buy;
    };
    orderBookMock.getBestSellOffer = () => ({
      price: 20
    });
    const buy = {
      price: 5,
      quantity: 10,
      uid: "id2"
    };

    matcher.addNewBuy(buy);

    expect(receivedBuy).toEqual(buy);
  });

  it("can find a compatible trade with a buy", () => {
    let receivedTrade;
    matchFoundHandler = (trade) => {
      receivedTrade = trade;
    };
    orderBookMock.addBuy = () => {
      throw new Error("This buy should not be added to the order book");
    };
    orderBookMock.getBestSellOffer = () => ({
      price: 5,
      orders: [{
        price: 5,
        quantity: 10
      }]
    });
    const buy = {
      price: 20,
      quantity: 10,
      uid: "id3"
    };

    matcher.addNewBuy(buy);

    expect(receivedTrade).not.toBeUndefined();
    expect(receivedTrade.price).toEqual(5);
    expect(receivedTrade.quantity).toEqual(10);
  });

  it("can find multiple compatible trades with a buy", () => {
    let receivedTrades = [];
    matchFoundHandler = (trade) => {
      receivedTrades.push(trade);
      // after the first trade has matched then get the next best offer
      orderBookMock.getBestSellOffer = () => ({
        price: 15,
        orders: [{
          price: 15,
          quantity: 10
        }]
      });
    };
    orderBookMock.addBuy = () => {
      throw new Error("This buy should not be added to the order book");
    };
    orderBookMock.getBestSellOffer = () => ({
      price: 5,
      orders: [{
        price: 5,
        quantity: 10
      }]
    });
    const buy = {
      price: 20,
      quantity: 20,
      uid: "id4"
    };

    matcher.addNewBuy(buy);

    expect(receivedTrades.length).toEqual(2);
    expect(receivedTrades[0].price).toEqual(5);
    expect(receivedTrades[0].quantity).toEqual(10);
    expect(receivedTrades[1].price).toEqual(15);
    expect(receivedTrades[1].quantity).toEqual(10);
  });

  it("can find a compatible trade then add a buy in the order book", () => {
    let receivedTrades = [];
    let receivedBuy;
    matchFoundHandler = (trade) => {
      receivedTrades.push(trade);
      // after the first trade has matched then get the next best offer
      // this will be too expensive to match our buy
      orderBookMock.getBestSellOffer = () => ({
        price: 25,
        orders: [{
          price: 25,
          quantity: 10
        }]
      });
    };
    orderBookMock.addBuy = buy => {
      receivedBuy = buy;
    };
    orderBookMock.getBestSellOffer = () => ({
      price: 5,
      orders: [{
        price: 5,
        quantity: 10
      }]
    });
    const buy = {
      price: 20,
      quantity: 20,
      uid: "id5"
    };

    matcher.addNewBuy(buy);

    expect(receivedTrades.length).toEqual(1);
    expect(receivedTrades[0].price).toEqual(5);
    expect(receivedTrades[0].quantity).toEqual(10);

    expect(receivedBuy).not.toBeUndefined();
    expect(receivedBuy.price).toEqual(20);
    expect(receivedBuy.quantity).toEqual(10);
    expect(receivedBuy.uid).toEqual("id5");
  });

  // adding a sell
  it("can add a sell to the order book if there are no compatible trades", () => {
    let receivedSell;
    matchFoundHandler = () => {
      throw new Error("A trade should not be found");
    };
    orderBookMock.addSell = sell => {
      receivedSell = sell;
    };
    orderBookMock.getBestBuyOffer = () => ({
      price: 5,
      orders: [{
        price: 5,
        quantity: 10
      }]
    });
    const sell = {
      price: 20,
      quantity: 20,
      uid: "id6"
    };

    matcher.addNewSell(sell);

    expect(receivedSell).not.toBeUndefined();
    expect(receivedSell.price).toEqual(20);
    expect(receivedSell.quantity).toEqual(20);
    expect(receivedSell.uid).toEqual("id6");
  });
});
