import { put, takeEvery } from 'redux-saga/effects';
import { receiceMyBuys, receiceMySells } from '../../reducers/myTrades/actionCreator';
import { loadMyBuys, loadMySells } from '../../api/loadInitialData';
import { changeActiveUserType } from '../../reducers/user/userActionCreators';

function* refreshMyTrades(action) {
    yield put (receiceMyBuys(yield loadMyBuys(action.userName)));
    yield put (receiceMySells(yield loadMySells(action.userName)));
}

export function* watchChangeUser() {
    yield takeEvery(changeActiveUserType, refreshMyTrades); 
}