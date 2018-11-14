import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';

export default (initialState) => {
  const middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};