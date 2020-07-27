import React, { useEffect } from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import CustomBtn from '../../utils/CustomBtn';

import pic from '../../../assets/img/404.svg';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 Not Found';
  }, []);

  return (
    <Grid container textAlign="center" verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width="8">
          <Image src={pic} alt="Not found!" fluid />
        </Grid.Column>
        <Grid.Column width="8">
          <Header size="huge" style={{ fontSize: '7em' }}>
            404
          </Header>
          <Header size="large">
            UH OH! You're lost in{' '}
            <span style={{ color: 'green' }}>Natours</span>!
          </Header>
          <Header
            size="tiny"
            style={{
              color: '#777',
              fontWeight: '400',
              padding: '0 5rem',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}
          >
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </Header>
          <CustomBtn
            linkTo="/"
            classes="custom-btn d-inline-block"
            rgb={'40, 180, 133'}
          >
            Home
          </CustomBtn>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NotFound;
