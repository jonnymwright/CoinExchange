const getHistoricalTrades = () => {
  return [
    {
      price: 10,
      quantity: 5,
      time: new Date(2018, 10, 12, 8, 17, 0)
    },
    {
      price: 11,
      quantity: 7,
      time: new Date(2018, 10, 12, 8, 13, 0)
    },
    {
      price: 10,
      quantity: 8,
      time: new Date(2018, 10, 12, 8, 10, 0)
    }
  ];
};

module.exports = getHistoricalTrades;