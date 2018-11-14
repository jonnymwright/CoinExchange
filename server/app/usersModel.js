const allData = {
  Tom: { buys: [{
    price: 16,
    quantity: 7
  },{
    price: 15,
    quantity: 4
  },{
    price: 11,
    quantity: 5
  }], sells: [{
    price: 9,
    quantity: 5
  }] },
  Dick: { buys: [], sells: [] },
  Harry: { buys: [], sells: [] }
};

const getUsers = () => {
  return Object.keys(allData);
};

const getBuys = (user) => {
    return allData[user].buys;
};

const getSells = (user) => {
    return allData[user].sells;
};

module.exports = { getUsers, getBuys, getSells };
