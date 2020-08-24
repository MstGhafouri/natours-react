import React from 'react';
import { Loader } from 'semantic-ui-react';

const ButtonLoader = ({ isLoading, loadingText, text }) => {
  return (
    <React.Fragment>
      <Loader
        inline
        inverted
        className={`${isLoading ? 'active' : ''}`}
        style={{ marginRight: '3px' }}
      />
      {isLoading ? loadingText : text}
    </React.Fragment>
  );
};

export default ButtonLoader;
