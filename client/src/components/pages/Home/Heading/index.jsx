import React, { useState } from 'react';
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
  const [term, setTerm] = useState('recent');

  const OnOptionChange = (e, data) => {
    fetchTours({ page: 1, sortBy: `-${data.value}` });
    let text = 'recent';
    switch (data.value) {
      case 'maxGroupSize':
        text = 'crowded';
        break;
      case 'price':
        text = 'expensive';
        break;
      case 'createdAt':
        text = 'recent';
        break;
      case 'ratingsAverage':
        text = 'popular';
        break;
      default:
        text = 'recent';
    }
    setTerm(text);
  };

  return (
    <Segment size="large" raised className="tours-heading">
      <Header>{`Most ${term} Tours`}</Header>
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
