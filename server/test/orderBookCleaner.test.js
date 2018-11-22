var { removeBuysFromOrderBook } = require("../app/orderBookCleaner");
var OrderBookModel = require("../app/orderBookModel");

describe("orderBookCleaner", () => {
  let orderBookModel;

  beforeEach(() => {
    orderBookModel = new OrderBookModel();
  });

  it("removes the only buy", () => {
    orderBookModel.addBuy({
      price: 5,
      quantity: 5,
      uid: "id1"
    });
    const trade = {
      price: 5,
      quantity: 5,
      uid: "id2"
    };

    removeBuysFromOrderBook(trade, orderBookModel);

    expect(orderBookModel.getAggregatedBuyOrders()).toEqual([]);
    expect(orderBookModel.getBestBuyOffer()).toBeUndefined();
  });

  it("removes a single buy", () => {
    orderBookModel.addBuy({
      price: 5,
      quantity: 5,
      uid: "id3"
    });
    orderBookModel.addBuy({
      price: 10,
      quantity: 5,
      uid: "id4"
    });
    const trade = {
      price: 5,
      quantity: 5,
      uid: "id5"
    };

    removeBuysFromOrderBook(trade, orderBookModel);

    expect(orderBookModel.getAggregatedBuyOrders()).toEqual([
      {
        price: 10,
        quantity: 5
      }
    ]);
  });

  it("reduces available buy orders", () => {
    orderBookModel.addBuy({
      price: 5,
      quantity: 20,
      uid: "id6"
    });
    const trade = {
      price: 5,
      quantity: 5,
      uid: "id7"
    };

    removeBuysFromOrderBook(trade, orderBookModel);

    expect(orderBookModel.getAggregatedBuyOrders()).toEqual([
      {
        price: 5,
        quantity: 15
      }
    ]);
  });
});
