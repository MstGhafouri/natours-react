import React from 'react';
import { Message } from 'semantic-ui-react';

const EmptyMessage = () => {
  return (
    <Message info>
      <Message.Header>You have not booked any tours yet !</Message.Header>
    </Message>
  );
};

export default EmptyMessage;
