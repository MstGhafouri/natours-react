import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';

import SearchBar from './SearchBar';
import logo from '../../assets/img/icons/logo-white.png';

class Header extends React.Component {
  render() {
    return (
      <Menu className="navigation" borderless>
        <Menu.Item
          as={NavLink}
          exact
          to="/"
          name="AllTours"
          className="animated-item"
        >
          <Image src={logo} alt="Natours" className="navigation__logo" />
        </Menu.Item>
        <Menu.Item>
          <SearchBar />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} exact className="animated-item" to="/login">
            <Icon name="sign-in" />
            Log in
          </Menu.Item>
          <Menu.Item as={NavLink} exact className="animated-item" to="/signup">
            <Icon name="plus" />
            Sign up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
