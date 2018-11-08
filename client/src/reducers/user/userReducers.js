import { changeActiveUserType } from "./userActionCreators";
import { combineReducers } from "redux";

const users = (state = {}, action) => {
  return state;
};

const activeUser = (state = "Tom", action) => {
  switch (action.type) {
    case changeActiveUserType:
      return action.userName;
    default:
      return state;
  }
};

const user = combineReducers ({
    activeUser,
    users
  }
);
export default user;