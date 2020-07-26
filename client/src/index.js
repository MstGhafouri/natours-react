import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes.jsx';

import 'semantic-ui-css/semantic.min.css';
import './assets/sass/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
