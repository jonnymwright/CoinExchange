import rootReducer from '../reducers/root';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';

export default (initialState) => {
  const middleware = [];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};