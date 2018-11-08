import { connect } from "react-redux";
import UserSelectorView from "./UserSeletorView";
import {changeActiveUser} from '../../../reducers/users/userActionCreators'

const mapStateToProps = state => {
  return {
    users: state.user.users
  };
};
const mapDispatchToProps = {
    onChange: changeActiveUser
};

const UserSelectorController = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSelectorView);
export default UserSelectorController;
