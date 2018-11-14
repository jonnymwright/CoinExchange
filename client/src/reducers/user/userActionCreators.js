import { receiceMyBuys, receiceMySells } from '../myTrades/actionCreator';
import { loadMyBuys, loadMySells } from '../../api/loadInitialData';

export const changeActiveUserType = 'CHANGE_ACTIVE_USER';
export const receiveUsersId = "RECEIVE_USERS";

const changeActiveUserAction = (userName) => ({
    type: changeActiveUserType,
    userName
});

export const changeActiveUser = (userName) => async (dispatch) => {
    dispatch(receiceMyBuys(await loadMyBuys(userName)));
    dispatch(receiceMySells(await loadMySells(userName)));
    return dispatch(changeActiveUserAction(userName));
}

export const receiveUsers = users => ({
    type: receiveUsersId,
    users
});