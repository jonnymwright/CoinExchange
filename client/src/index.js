import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configure-store';
const store = configureStore({user: {users: ['Tom', 'Dick']}});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
