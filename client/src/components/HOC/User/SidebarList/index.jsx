import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';

import ListItem from './ListItem';
import AdminItems from './AdminItems';
import UserItems from './UserItems';


const SidebarList = ({ currentUser }) => {
  return (
    <List link>
      <UserItems />
      {
        currentUser && currentUser.role === 'admin' ? <AdminItems /> : null 
      }
    </List>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps)(SidebarList);
