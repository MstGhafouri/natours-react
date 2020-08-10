import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Container } from 'semantic-ui-react';

import { fetchTours } from '../../../redux/actions/tour';
import Card from './Card';
import Heading from './Heading';
import Pagination from './Pagination';

const Home = ({ fetchTours, tours }) => {
  useEffect(() => {
    document.title = 'Natours | Where Life Begins';
    fetchTours();
  }, [fetchTours]);

  return (
    <div className="section-tours">
      <Heading />
      <Grid doubling stackable columns={3}>
        {tours.map(tour => (
          <Grid.Column key={tour.id} className="card-container">
            <Card {...tour} />
          </Grid.Column>
        ))}
      </Grid>
      <Container textAlign="center">
        <Pagination />
      </Container>
    </div>
  );
};

const mapStateToProps = ({ tours }) => {
  return { tours };
};

export default connect(mapStateToProps, { fetchTours })(Home);
