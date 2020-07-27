import React, { useEffect } from 'react';
import { Grid, Container } from 'semantic-ui-react';

import Card from './Card';
import Heading from './Heading';
import Pagination from './Pagination';

const Home = () => {
  useEffect(() => {
    document.title = 'Natours | Where Life Begins';
  }, []);

  return (
    <div className="section-tours">
      <Heading />
      <Grid doubling stackable columns={3}>
        <Grid.Column className="card-container">
          <Card season="fall" />
        </Grid.Column>
        <Grid.Column className="card-container">
          <Card season="summer" />
        </Grid.Column>
        <Grid.Column className="card-container">
          <Card season="winter" />
        </Grid.Column>
        <Grid.Column className="card-container">
          <Card season="summer" />
        </Grid.Column>
      </Grid>
      <Container textAlign="center">
        <Pagination />
      </Container>
    </div>
  );
};

export default Home;
