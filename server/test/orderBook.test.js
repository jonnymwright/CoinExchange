const OrderBookModel = require('../app/orderBookModel');

describe('OrderBookModel', () => {
  let model;

  beforeEach(() => {
    model = new OrderBookModel();
  });

  it('is initially empty', () => {
    expect(model.getAggregatedBuyOrders()).toEqual([]);
    expect(model.getAggregatedSellOrders()).toEqual([]);
  });

  it('can retrieve an buy order just added', () => {
    model.addBuy({
      price: 10,
      quantity: 5,
      uid: 'id1'
    });

    const buys = model.getAggregatedBuyOrders();

    expect(buys.length).toEqual(1);
    expect(buys[0].price).toEqual(10);
    expect(buys[0].quantity).toEqual(5);
  });

  it('can retrieve an sell order just added', () => {
    model.addSell({
      price: 10,
      quantity: 5,
      uid: 'id2'
    });

    const buys = model.getAggregatedSellOrders();

    expect(buys.length).toEqual(1);
    expect(buys[0].price).toEqual(10);
    expect(buys[0].quantity).toEqual(5);
  });

  it('can aggregate buys of the same value', () => {
    model.addBuy({
      price: 10,
      quantity: 5,
      uid: 'id3'
    });
    model.addBuy({
      price: 10,
      quantity: 3,
      uid: 'id4'
    });

    const buys = model.getAggregatedBuyOrders();

    expect(buys.length).toEqual(1);
    expect(buys[0].price).toEqual(10);
    expect(buys[0].quantity).toEqual(8);
  });

  it('can aggregate sells of the same value', () => {
    model.addSell({
      price: 10,
      quantity: 5,
      uid: 'id6'
    });
    model.addSell({
      price: 10,
      quantity: 3,
      uid: 'id7'
    });

    const sells = model.getAggregatedSellOrders();

    expect(sells.length).toEqual(1);
    expect(sells[0].price).toEqual(10);
    expect(sells[0].quantity).toEqual(8);
  });

  it('does not aggregate sells of different value', () => {
    model.addSell({
      price: 22,
      quantity: 5,
      uid: 'id8'
    });
    model.addSell({
      price: 10,
      quantity: 3,
      uid: 'id9'
    });

    const sells = model.getAggregatedSellOrders();

    expect(sells.length).toEqual(2);
  });

  it('does not aggregate buys of different value', () => {
    model.addBuy({
      price: 22,
      quantity: 5,
      uid: 'id10'
    });
    model.addBuy({
      price: 10,
      quantity: 3,
      uid: 'id11'
    });

    const buys = model.getAggregatedBuyOrders();

    expect(buys.length).toEqual(2);
  });

  it('can find the best buy offer', () => {
    model.addBuy({
      price: 22,
      quantity: 5,
      uid: 'id12'
    });
    model.addBuy({
      price: 10,
      quantity: 3,
      uid: 'id13'
    });

    const buys = model.getBestBuyOffer();

    expect(buys.price).toEqual(22);
    expect(buys.orders[0].uid).toEqual('id12');
  });

  it('can find the best sell offer', () => {
    model.addSell({
      price: 22,
      quantity: 5,
      uid: 'id14'
    });
    model.addSell({
      price: 10,
      quantity: 3,
      uid: 'id15'
    });

    const sells = model.getBestSellOffer();

    expect(sells.price).toEqual(10);
    expect(sells.orders[0].uid).toEqual('id15');
  });

  it("can't find the best buy offer if there are none", () => {
    const buys = model.getBestBuyOffer();

    expect(buys).toBeUndefined();
  });

  it("can't find the best sell offer if there are none", () => {
    const sells = model.getBestSellOffer();

    expect(sells).toBeUndefined;
  });

  it('gets sells for my user', () => {
    model.addSell({
      price: 22,
      quantity: 5,
      uid: 'id16',
      user: 'my user'
    });

    const mySells = model.getSellOrdersFor('my user');

    expect(mySells).toEqual([
      {
        price: 22,
        quantity: 5,
        user: 'my user'
      }
    ]);
  });

  it('does not get sells for a different user', () => {
    model.addSell({
      price: 22,
      quantity: 5,
      uid: 'id17',
      user: 'another user'
    });

    const mySells = model.getSellOrdersFor('my user');

    expect(mySells).toEqual([]);
  });

  it('can aggregate multiple sell offers from one user', () => {
    model.addSell({
      price: 22,
      quantity: 5,
      uid: 'id18',
      user: 'another user'
    });
    model.addSell({
      price: 22,
      quantity: 2,
      uid: 'id19',
      user: 'my user'
    });
    model.addSell({
      price: 22,
      quantity: 6,
      uid: 'id20',
      user: 'my user'
    });

    const mySells = model.getSellOrdersFor('my user');

    expect(mySells).toEqual([
      {
        price: 22,
        quantity: 8,
        user: 'my user'
      }
    ]);
  });

  it('can get multiple different buy orders', () => {
    model.addBuy({
      price: 22,
      quantity: 2,
      uid: 'id21',
      user: 'my user'
    });
    model.addBuy({
      price: 25,
      quantity: 6,
      uid: 'id22',
      user: 'my user'
    });

    const myBuys = model.getBuyOrdersFor('my user');

    expect(myBuys).toEqual([
      
      {
        price: 25,
        quantity: 6,
        user: 'my user'
      },
      {
        price: 22,
        quantity: 2,
        user: 'my user'
      }
    ]);
  });
});
