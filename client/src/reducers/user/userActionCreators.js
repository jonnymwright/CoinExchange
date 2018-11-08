export const changeActiveUserType = 'CHANGE_ACTIVE_USER';

export const changeActiveUser = (userName) => ({
    type: changeActiveUserType,
    userName
});