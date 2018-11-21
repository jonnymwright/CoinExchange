export const changeActiveUserType = 'CHANGE_ACTIVE_USER';
export const receiveUsersId = "RECEIVE_USERS";

const changeActiveUserAction = (userName) => ({
    type: changeActiveUserType,
    userName
});

export const changeActiveUser = (userName) => async (dispatch) => {
    return dispatch(changeActiveUserAction(userName));
}

export const receiveUsers = users => ({
    type: receiveUsersId,
    users
});
