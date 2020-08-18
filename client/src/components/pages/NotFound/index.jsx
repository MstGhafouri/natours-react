import React, { useEffect } from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import CustomBtn from '../../utils/CustomBtn';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 Not Found';
  }, []);

  return (
    <Grid
      container
      textAlign="center"
      className="notFound-page"
      verticalAlign="middle"
    >
      <Grid.Row>
        <Grid.Column width="8">
          <Image
            src={`${process.env.PUBLIC_URL}/img/404.svg`}
            alt="Not found!"
            fluid
          />
        </Grid.Column>
        <Grid.Column width="8">
          <Header size="huge">404</Header>
          <Header size="large">
            OH NO! You're lost in&nbsp;
            <span style={{ color: 'green' }}>Natours</span>!
          </Header>
          <Header size="tiny">
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
