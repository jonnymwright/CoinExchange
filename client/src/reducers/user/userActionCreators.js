export const changeActiveUserType = 'CHANGE_ACTIVE_USER';
export const receiveUsersId = "RECEIVE_USERS";

export const changeActiveUser = (userName) => ({
    type: changeActiveUserType,
    userName
});

export const receiveUsers = users => ({
    type: receiveUsersId,
    users
});