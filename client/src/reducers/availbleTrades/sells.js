import { receiveRecentAvailableSellsId } from "./availbleTradesActionCreators";

const sells = (state = [], action) => {
  switch (action.type) {
    case receiveRecentAvailableSellsId:
      return action.sells;
    default:
      return state;
  }
};

export default sells;
