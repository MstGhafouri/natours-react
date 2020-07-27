import React from 'react';
import { Link } from 'react-router-dom';

const CustomBtn = ({ linkTo, classes, children, rgb }) => {
  return (
    <Link
      to={linkTo}
      className={classes}
      style={{ backgroundColor: `rgb(${rgb})` }}
    >
      {children}
    </Link>
  );
};

export default CustomBtn;
