import React from 'react';
import { Grid, Image, List, Header } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Grid stackable columns={2} className="footer">
      <Grid.Column>
        <Image
          src={`${process.env.PUBLIC_URL}/img/icons/logo-green.png`}
          alt="Natours"
          className="navigation__logo"
        />
      </Grid.Column>
      <Grid.Column>
        <Grid>
          <Grid.Row>
            <Grid.Column className="footer__list-wrapper">
              <List celled floated="right" horizontal className="footer__list">
                <List.Item href="#">About us</List.Item>
                <List.Item href="#">Download Apps</List.Item>
                <List.Item href="#">Careers</List.Item>
                <List.Item href="#">Become A Guide</List.Item>
                <List.Item href="#">Contact</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header.Subheader>
                &copy; By Mostafa Ghafouri. All rights reserved.
              </Header.Subheader>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

export default Footer;
