import React from 'react';
import { Divider } from 'semantic-ui-react';

import ListItem from '../ListItem';

const AdminItems = () => {
  return (
    <React.Fragment>
      <Divider horizontal>Admin</Divider>
      {adminLinks.map((link, i) => (
        <ListItem {...link} key={i} />
      ))}
    </React.Fragment>
  );
};

const adminLinks = [
  {
    text: 'Manage users',
    icon: 'users',
    linkTo: '/admin/manage-users',
    isActive: false
  },
  {
    text: 'Manage tours',
    icon: 'chart bar outline',
    linkTo: '/admin/manage-tours',
    isActive: false
  },
  {
    text: 'Manage Reviews',
    icon: 'comment alternate outline',
    linkTo: '/admin/manage-reviews',
    isActive: false
  }
];

export default AdminItems;
