import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';

import SearchBar from './SearchBar';
import LoginSignup from './LoginSignup';
import UserItems from './UserItems';

const Header = ({ currentUser }) => {
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
        {currentUser ? <UserItems /> : <LoginSignup />}
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps)(Header);
