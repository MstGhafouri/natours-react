import React from 'react';

import ListItem from '../ListItem';

const UserItems = () => {
  return (
    <React.Fragment>
      {userLinks.map((link, i) => (
        <ListItem {...link} key={i} />
      ))}
    </React.Fragment>
  );
};

const userLinks = [
  {
    text: 'Settings',
    icon: 'settings',
    linkTo: '/me/settings',
    isActive: false
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

export default UserItems;
