import React from 'react';
import { List, Divider } from 'semantic-ui-react';

import ListItem from './ListItem';

const _renderUserLinks = () =>
  userLinks.map((link, i) => <ListItem {...link} key={i} />);
const _renderAdminLinks = () =>
  adminLinks.map((link, i) => <ListItem {...link} key={i} />);

const SidebarList = () => {
  return (
    <List link>
      {_renderUserLinks()}
      <Divider horizontal>Admin</Divider>
      {_renderAdminLinks()}
    </List>
  );
};

const userLinks = [
  {
    text: 'Settings',
    icon: 'settings',
    linkTo: '/me/settings',
    isActive: true
  },
  {
    text: 'My Bookmarks',
    icon: 'briefcase',
    linkTo: '/me/bookmarks',
    isActive: false
  },
  {
    text: 'My Reviews',
    icon: 'star outline',
    linkTo: '/me/reviews',
    isActive: false
  },
  {
    text: 'Billing',
    icon: 'money bill alternate outline',
    linkTo: '/me/billing',
    isActive: false
  }
];

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

export default SidebarList;
