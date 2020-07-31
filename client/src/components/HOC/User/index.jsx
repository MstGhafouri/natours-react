import React from 'react';
import { Grid } from 'semantic-ui-react';

import SidebarList from './SidebarList';

const UserLayout = ({ children }) => {
  return (
    <div className="user-panel">
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width="4">
            <SidebarList />
          </Grid.Column>
          <Grid.Column width="12">{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserLayout;
