import * as types from "./userActionCreators";
import { combineReducers } from "redux";

const users = (state = [], action) => {
  console.log(action.type);
  console.log(types.receiveUsersId)
  switch (action.type) {
    case types.receiveUsersId:
      console.log(action);
      return action.users;
    default:
      return state;
  }
};

const activeUser = (state = "Tom", action) => {
  switch (action.type) {
    case types.changeActiveUserType:
      return action.userName;
    default:
      return state;
  }
};

const user = combineReducers({
  activeUser,
  users
});
export default user;
