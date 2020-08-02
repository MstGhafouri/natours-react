import React, { useEffect } from 'react';

import TourHeader from './Header';
import TourDescription from './Description';
import TourPictures from './Pictures';
import TourMap from './Map';
import TourReviews from './Reviews';
import TourCTA from './CTA';

const Tour = () => {
  useEffect(() => {
    document.title = 'Natours | The Park';
  }, []);

  return (
    <React.Fragment>
      <TourHeader />
      <TourDescription />
      <TourPictures />
      <TourMap />
      <TourReviews />
      <TourCTA />
    </React.Fragment>
  );
};

export default Tour;
