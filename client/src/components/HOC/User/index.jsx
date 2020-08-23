import React, { useState, useEffect } from 'react';
import { Grid, Responsive, Checkbox } from 'semantic-ui-react';

import SidebarList from './SidebarList';
import useWindowWidth from './useWindowWidth';

const UserLayout = ({ children }) => {
  const [check, setCheck] = useState(false);
  const { width } = useWindowWidth();

  useEffect(() => {
    if (width > 902) setCheck(true);
  }, [width]);

  const onToggleCheck = () => {
    setCheck(!check);
  };

  return (
    <div className="user-panel">
      <Responsive maxWidth={902} className="responsive-box">
        <Checkbox toggle checked={check} onChange={onToggleCheck} />
        <label>Toggle Sidebar</label>
      </Responsive>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column
            width="4"
            className="user-panel__sidebar"
            style={{
              transform: `${check ? 'translateX(0)' : 'translateX(-100%)'}`
            }}
          >
            <SidebarList />
          </Grid.Column>
          <Grid.Column width="12" className="user-panel__content">
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserLayout;
