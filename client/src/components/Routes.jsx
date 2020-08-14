import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import history from '../history';
import Layout from './HOC/Layout.jsx';
import Home from './pages/Home';
import Tour from './pages/Tour';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserPanel from './pages/UserPanel/Account';
import PasswordReset from './pages/PasswordReset';
import NotFound from './pages/404';

class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/tour/:slug" exact>
              <Tour />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/password-reset" exact>
              <PasswordReset />
            </Route>
            <Route path="/me/settings" exact>
              <UserPanel />
            </Route>
            <Redirect from="/me" to="/me/settings" />
            <Route path="/404" exact>
              <NotFound />
            </Route>
            <Redirect to="/404" />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default Routes;
