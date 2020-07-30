import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/404';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Routes;
