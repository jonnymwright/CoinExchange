import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import connect from './api/sockets';

import configureStore from './store/configure-store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

connect(
  store.dispatch,
  {
    recentTradesCount: 20,
    source: 'Web frontend'
  }
);

registerServiceWorker();
