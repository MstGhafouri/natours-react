import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Container } from 'semantic-ui-react';
import { Element } from 'react-scroll';

import { fetchTours } from '../../../redux/actions/tour';
import { loadingSelector as createLoadingSelector } from '../../../redux/reducers/loading';
import Spinner from '../../utils/Spinner';
import Card from './Card';
import Heading from './Heading';
import Pagination from './Pagination';

const Home = ({ fetchTours, tours, isLoading }) => {
  useEffect(() => {
    document.title = 'Natours | Where Life Begins';
    fetchTours();
  }, [fetchTours]);

  return (
    <div className="section-tours">
      {isLoading && <Spinner />}
      <Element name="header">
        <Heading />
      </Element>
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

const loadingSelector = createLoadingSelector(['GET_TOURS']);

const mapStateToProps = state => ({
  tours: state.tours,
  isLoading: loadingSelector(state)
});

export default connect(mapStateToProps, { fetchTours })(Home);
