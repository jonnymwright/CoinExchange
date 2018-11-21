import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga'

export default (initialState) => {
  const sagaMiddleWare = createSagaMiddleware();
  const middleware = [sagaMiddleWare, thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }
  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
  sagaMiddleWare.run(rootSaga);

  return store;
};
