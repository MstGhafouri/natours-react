import React from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'semantic-ui-react';

const ListItem = ({ text, icon, isActive, linkTo }) => {
  return (
    <List.Item className={isActive ? 'active' : ''} as={NavLink} to={linkTo}>
      <List.Icon name={icon} />
      <List.Content>
        <List.Header>{text}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default ListItem;
