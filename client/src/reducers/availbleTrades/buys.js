import { receiveRecentAvailableBuysId } from "./availbleTradesActionCreators";

const buys = (state = [], action) => {
  switch (action.type) {
    case receiveRecentAvailableBuysId:
      return action.buys;
    default:
      return state;
  }
};

export default buys;
