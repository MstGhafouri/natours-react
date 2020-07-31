import React, { useEffect } from 'react';

import UserLayout from '../../HOC/User';

const UserPanel = () => {
  useEffect(() => {
    document.title = 'Natours | Your Account';
  }, []);

  return <UserLayout>Hello</UserLayout>;
};

export default UserPanel;
