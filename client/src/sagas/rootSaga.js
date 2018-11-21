import { all } from 'redux-saga/effects';
import { watchChangeUser } from './user/userSaga';

function logSagaMiddleware() {
  console.log('Saga middleware starting');
}

export default function* rootSaga() {
  yield all([logSagaMiddleware(), watchChangeUser()]);
}
