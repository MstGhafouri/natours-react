import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { toastr } from 'react-redux-toastr';
import { Icon } from 'semantic-ui-react';

import { fetchUserTours } from '../../../../redux/actions/user';
import { loadingSelector as createLoadingSelector } from '../../../../redux/reducers/loading';
import Spinner from '../../../utils/Spinner';
import UserLayout from '../../../HOC/User';
import ContentBox from '../../../utils/ContentBox';
import EmptyMessage from './EmptyMessage';
import UserTours from './UserTours';

const toastrMessageOptions = {
  timeOut: 10000,
  position: 'top-center',
  icon: <Icon size="big" name="check" />
};

const UserBookedTours = ({ bookings, fetchUserTours, isLoading }) => {
  const location = useLocation();

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const { alert } = parsed;

    if (alert === 'booking') {
      toastr.success(
        'Success',
        "Your booking was successful. If your booking doesn't show up here immediately, please come back later.",
        toastrMessageOptions
      );
    }
    fetchUserTours();
  }, [fetchUserTours]);

  return (
    <UserLayout>
      <div className="user-tours">
        <ContentBox headingText="Your tours">
          {isLoading ? (
            <Spinner />
          ) : bookings && bookings.length ? (
            <UserTours userTours={bookings} />
          ) : (
            <EmptyMessage />
          )}
        </ContentBox>
      </div>
    </UserLayout>
  );
};

const loadingSelector = createLoadingSelector(['FETCH_USER_TOURS']);

const mapStateToProps = state => ({
  bookings: state.user.bookings,
  isLoading: loadingSelector(state)
});

export default connect(mapStateToProps, { fetchUserTours })(UserBookedTours);
