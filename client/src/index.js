import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configure-store';

const initialState = {
  user: {users: ['Tom', 'Dick']},
  recentTrades: [
    {
      price: 10,
      quantity: 5,
      time: new Date(2018, 10, 8, 16, 17, 0)
    },
    {
      price: 11,
      quantity: 7,
      time: new Date(2018, 10, 8, 16, 13, 0)
    },
    {
      price: 10,
      quantity: 8,
      time: new Date(2018, 10, 8, 16, 10, 0)
    }
  ]
}

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
