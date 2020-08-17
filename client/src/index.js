import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import ReduxToastr from 'react-redux-toastr';

import { store, persistor } from "./redux/store";

import 'semantic-ui-css/semantic.min.css';
import './assets/sass/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        getState={state => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);
