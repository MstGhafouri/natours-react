import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTour } from '../../../redux/actions/tour';
import { loadingSelector as createLoadingSelector } from '../../../redux/reducers/loading';
import Spinner from '../../utils/Spinner';
import TourHeader from './Header';
import TourDescription from './Description';
import TourPictures from './Pictures';
import TourMap from './Map';
import TourReviews from './Reviews';
import TourCTA from './CTA';

const Tour = ({ fetchTour, selectedTour, isLoading }) => {
  const { slug } = useParams();

  useEffect(() => {
    document.title = 'Natours | Tour';
    fetchTour(slug);
  }, [fetchTour, slug]);

  return selectedTour === null || isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <TourHeader
        name={selectedTour.name}
        image={selectedTour.imageCover}
        duration={selectedTour.duration}
        locationText={selectedTour.startLocation.description}
        season={selectedTour.season}
      />
      <TourDescription
        date={selectedTour.startDates[0]}
        size={selectedTour.maxGroupSize}
        difficulty={selectedTour.difficulty}
        ratingsAverage={selectedTour.ratingsAverage}
        guides={selectedTour.guides}
        description={selectedTour.description}
        name={selectedTour.name}
        season={selectedTour.season}
      />
      <TourPictures images={selectedTour.images} />
      <TourMap
        locations={selectedTour.locations}
        season={selectedTour.season}
      />
      <TourReviews
        reviews={selectedTour.reviews}
        season={selectedTour.season}
      />
      <TourCTA
        duration={selectedTour.duration}
        images={selectedTour.images}
        season={selectedTour.season}
        tourId={selectedTour.id}
      />
    </React.Fragment>
  );
};

const loadingSelector = createLoadingSelector(['GET_TOUR']);

const mapStateToProps = state => ({
  selectedTour: state.selectedTour,
  isLoading: loadingSelector(state)
});

export default connect(mapStateToProps, { fetchTour })(Tour);
