import React from 'react';
import { Segment, Dropdown, Header } from 'semantic-ui-react';

const tourOptions = [
  {
    key: 'Popular',
    text: 'Popular',
    value: 'Popular',
    icon: 'fire',
  },
  {
    key: 'Date',
    text: 'Date',
    value: 'Date',
    icon: 'calendar outline',
  },
  {
    key: 'Price',
    text: 'Price',
    value: 'Price',
    icon: 'money bill alternate outline'
  },
  {
    key: 'Size',
    text: 'Size',
    value: 'Size',
    icon: 'users'
  }
];

const Heading = () => {
  return (
    <Segment size="large" raised className="tours-heading">
      <Header>Most Popular Tours</Header>
      <span>
        Show me tours by{' '}
        <Dropdown
          className="icon"
          inline
          options={tourOptions}
          defaultValue={tourOptions[0].value}
        />
      </span>
    </Segment>
  );
};

export default Heading;
