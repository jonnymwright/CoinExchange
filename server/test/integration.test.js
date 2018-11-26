const createMatcher = require("../app/factory")

describe("Integration", () => {
    let matcher;
    let orderBook;
    let orderHistoryModel;

    beforeEach(() => {
        ({ matcher, orderBook, orderHistoryModel } = createMatcher());
    });

    it ("adds sells to the order book", () => {
        const sell = {
            price: 5,
            quantity: 5,
            uid: "id1"
        };

        matcher.addNewSell(sell);

        const sells = orderBook.getAggregatedSellOrders();
        expect(sells.length).toEqual(1);
        expect(sells[0].price).toEqual(5);
        expect(sells[0].quantity).toEqual(5);
    });

    it ("removes the only trade from the order book once executed", () => {
        const sell = {
            price: 5,
            quantity: 5,
            uid: "id2"
        };
        const buy = {
            price: 5,
            quantity: 5,
            uid: "id3"
        };

        matcher.addNewBuy(buy);
        matcher.addNewSell(sell);

        expect(orderBook.getAggregatedSellOrders().length).toEqual(0);
        expect(orderBook.getAggregatedBuyOrders().length).toEqual(0);
    });
    

    it ("removes trades from the order book once executed", () => {
        const sell1 = {
            price: 5,
            quantity: 5,
            uid: "id4"
        };
        const sell2 = {
            price: 6,
            quantity: 5,
            uid: "id5"
        };
        const buy = {
            price: 6,
            quantity: 6,
            uid: "id6"
        };

        matcher.addNewSell(sell1);
        matcher.addNewSell(sell2);
        matcher.addNewBuy(buy);

        const sells = orderBook.getAggregatedSellOrders();
        expect(sells.length).toEqual(1);
        expect(sells[0].price).toEqual(6);
        expect(sells[0].quantity).toEqual(4);
        expect(orderBook.getAggregatedBuyOrders().length).toEqual(0);
    });

    it ("emits a trade into the historical trades", () => {
        const sell = {
            price: 5,
            quantity: 5,
            uid: "id7"
        };
        const buy = {
            price: 5,
            quantity: 5,
            uid: "id8"
        };
        matcher.addNewBuy(buy);
        matcher.addNewSell(sell);

        const historical = orderHistoryModel.getHistoricalTrades();

        expect(historical.length).toEqual(1);
    });
});