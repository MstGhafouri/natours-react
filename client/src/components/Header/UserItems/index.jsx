import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useLocation} from 'react-router-dom';
import { Menu, Icon, Image } from 'semantic-ui-react';

import { logout } from '../../../redux/actions/user';

const UserItems = ({ currentUser, logout }) => {
  const pathname = useLocation().pathname;

  return (
    <React.Fragment>
      <Menu.Item className="animated-item" onClick={logout}>
        <Icon name="sign-out" />
        Log out
      </Menu.Item>

      {!pathname.includes('/me') && (
        <Menu.Item
          as={NavLink}
          exact
          className="animated-item"
          to="/me/settings"
        >
          <Image
            src={
              currentUser
                ? `${process.env.PUBLIC_URL}/img/users/${currentUser.photo}`
                : ''
            }
            avatar
          />
          <span>{currentUser ? currentUser.name.split(' ')[0] : ''}</span>
        </Menu.Item>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps, { logout })(UserItems);
