import React, { Component } from "react";
import { connect } from "react-redux";
import UserSelectorView from "./UserSeletorView";
import * as actionCreators from '../../../reducers/user/userActionCreators'
import { loadUsers } from "../../../api/loadInitialData";

const mapStateToProps = state => {
  return {
    users: state.user.users
  };
};
const mapDispatchToProps = {
    onChange: actionCreators.changeActiveUser,
    receiveUsers: actionCreators.receiveUsers
};

class UserSelectorController extends Component {
  async componentDidMount() {
    this.props.receiveUsers(await loadUsers());
  }
  
  render() {
    return (<UserSelectorView users={this.props.users} onChange={this.props.onChange}/>);
  }
}

UserSelectorController = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSelectorController);
export default UserSelectorController;
