import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import connect from './api/sockets';

import configureStore from './store/configure-store';

const initialState = {
  user: {users: []},
  myTrades: {
    buys: [],
    sells: [{
      price: 9,
      quantity: 5
    }]
  }
}

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

connect(store.dispatch);

registerServiceWorker();
