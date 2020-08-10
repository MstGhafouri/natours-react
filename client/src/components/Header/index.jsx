import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';

import SearchBar from './SearchBar';

const Header = () => {
  const pathname = useLocation().pathname;

  return (
    <Menu className="navigation" borderless>
      <Menu.Item
        as={NavLink}
        exact
        to="/"
        name="AllTours"
        className="animated-item"
      >
        <Image
          src={`${process.env.PUBLIC_URL}/img/icons/logo-white.png`}
          alt="Natours"
          className="navigation__logo"
        />
      </Menu.Item>
      {pathname === '/' && (
        <Menu.Item>
          <SearchBar />
        </Menu.Item>
      )}
      <Menu.Menu position="right">
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
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
