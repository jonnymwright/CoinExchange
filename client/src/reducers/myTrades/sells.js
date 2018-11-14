import * as actionCreator from "./actionCreator";

const sells = (state = [], action) => {
  switch (action.type) {
    case actionCreator.receiveMySellsId:
      return action.sells;
    default:
      return state;
  }
};

export default sells;
