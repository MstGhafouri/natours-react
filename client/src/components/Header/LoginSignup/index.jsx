import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

const LoginSignup = () => {
  const pathname = useLocation().pathname;

  return (
    <React.Fragment>
      {pathname !== '/login' && (
        <Menu.Item as={NavLink} exact className="animated-item" to="/login">
          <Icon name="sign-in" />
          Log in
        </Menu.Item>
      )}
      {pathname !== '/signup' && (
        <Menu.Item as={NavLink} exact className="animated-item" to="/signup">
          <Icon name="plus" />
          Sign up
        </Menu.Item>
      )}
    </React.Fragment>
  );
};

export default LoginSignup;
