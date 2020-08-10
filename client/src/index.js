import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes.jsx';
import { Provider } from 'react-redux';

import store from './redux/store';

import 'semantic-ui-css/semantic.min.css';
import './assets/sass/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
