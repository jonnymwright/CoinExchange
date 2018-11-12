import * as actionCreator from "./recentTradesActionCreator";

const recentTrades = (state = [], action) => {
  switch (action.type) {
    case actionCreator.receiveRecentTradesId:
      return action.trades;
    default:
      return state;
  }
};
export default recentTrades;
