import React from 'react';
import { connect } from 'react-redux';
import { Segment, Dropdown, Header } from 'semantic-ui-react';

import { fetchTours } from '../../../../redux/actions/tour';

const tourOptions = [
  {
    key: 'Popular',
    text: 'Popular',
    value: 'ratingsAverage',
    icon: 'fire'
  },
  {
    key: 'Date',
    text: 'Newest',
    value: 'createdAt',
    icon: 'calendar outline'
  },
  {
    key: 'Price',
    text: 'Price',
    value: 'price',
    icon: 'money bill alternate outline'
  },
  {
    key: 'Size',
    text: 'Size',
    value: 'maxGroupSize',
    icon: 'users'
  }
];

const Heading = ({ fetchTours }) => {
  const OnOptionChange = (e, data) => {
    fetchTours({ page: 1, sortBy: `-${data.value}` });
  };

  return (
    <Segment size="large" raised className="tours-heading">
      <Header>Most Popular Tours</Header>
      <span>
        Show me tours by{' '}
        <Dropdown
          className="icon"
          inline
          options={tourOptions}
          defaultValue={tourOptions[1].value}
          onChange={OnOptionChange}
        />
      </span>
    </Segment>
  );
};

export default connect(null, { fetchTours })(Heading);
