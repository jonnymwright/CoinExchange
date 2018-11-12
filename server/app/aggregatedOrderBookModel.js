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

module.exports = { getAggregatedBuyOrders, getAggregatedSellOrders } ;
