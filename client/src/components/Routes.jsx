import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserPanel from './pages/UserPanel';
import PasswordReset from './pages/PasswordReset';
import NotFound from './pages/404';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/password-reset" exact component={PasswordReset} />
            <Route path="/me/settings" exact component={UserPanel} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Routes;
