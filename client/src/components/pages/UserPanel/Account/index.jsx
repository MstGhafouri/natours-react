import React from 'react';

import UserLayout from '../../../HOC/User';
import AccountForm from './AccountForm';
import PasswordForm from './PasswordForm';
import UserPhoto from './UserPhoto';

import { Tab } from 'semantic-ui-react';

const panes = [
  {
    menuItem: { key: 'photo', icon: 'image outline', content: 'Your photo' },
    render: () => (
      <Tab.Pane>
        <UserPhoto />
      </Tab.Pane>
    )
  },
  {
    menuItem: {
      key: 'account',
      icon: 'address card outline',
      content: 'Your account'
    },
    render: () => (
      <Tab.Pane>
        <AccountForm />
      </Tab.Pane>
    )
  },
  {
    menuItem: {
      key: 'password',
      icon: 'edit outline',
      content: 'Password change'
    },
    render: () => (
      <Tab.Pane>
        <PasswordForm />
      </Tab.Pane>
    )
  }
];

const AccountSettings = () => {
  return (
    <UserLayout>
      <Tab panes={panes} />
    </UserLayout>
  );
};

export default AccountSettings;
