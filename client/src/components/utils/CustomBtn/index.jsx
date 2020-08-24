import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';

const CustomBtn = ({
  linkTo,
  classes,
  children,
  rgb,
  isLink = true,
  type = 'submit',
  onClick
}) =>
  isLink ? (
    <Link
      to={linkTo}
      className={classes}
      style={{ backgroundColor: `rgb(${rgb})` }}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={classes}
      style={{ backgroundColor: `rgb(${rgb})` }}
      onClick={onClick}
    >
      {children}
    </button>
  );

export default CustomBtn;
