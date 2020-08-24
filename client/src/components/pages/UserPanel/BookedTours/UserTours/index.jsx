import React from 'react';
import { Grid } from 'semantic-ui-react';

import Card from '../../../Home/Card';

const UserTours = ({ userTours }) => {

  return (
    <Grid stackable columns={2}>
      {userTours.map(tour => (
        <Grid.Column key={tour.id} className="card-container">
          <Card {...tour} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default UserTours;
