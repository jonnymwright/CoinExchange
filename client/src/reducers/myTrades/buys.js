import * as actionCreator from './actionCreator';

const buys = (state = [], action) => {
  switch (action.type) {
    case actionCreator.receiveMyBuysId:
      return action.buys;
    default:
      return state;
  }
};

export default buys;
