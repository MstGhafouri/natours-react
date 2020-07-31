import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const ContentBox = ({ children, headingText }) => {
  return (
    <Container>
      <Header size="large">{headingText}</Header>
      {children}
    </Container>
  );
};

export default ContentBox;
