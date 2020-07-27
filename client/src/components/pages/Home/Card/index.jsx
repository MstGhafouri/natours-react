import React from 'react';
import { Icon, Grid, Label } from 'semantic-ui-react';

import CustomBtn from '../../../utils/CustomBtn';
import imageCover from '../../../../assets/img/tours/tour-1-cover.jpg';

const colorConfig = {
  summer: ['126, 213, 111', '40, 180, 133', 'green'],
  winter: ['109, 213, 250', '33, 147, 176', 'blue'],
  fall: ['255, 185, 0', '255, 119, 48', 'orange']
};

const Card = ({ season }) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div
            className="card__picture-overlay"
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgb(${colorConfig[season][0]}), rgb(${colorConfig[season][1]})), url(${imageCover})`
            }}
          >
            &nbsp;
          </div>
        </div>

        <h3 className="heading-tertiary">
          <span
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(${colorConfig[season][0]}, 0.8), rgba(${colorConfig[season][1]}, 0.8))`
            }}
          >
            The Forest Hiker
          </span>
        </h3>
      </div>

      <div className="card__details">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h4 className="card__sub-heading">Easy 5-day tour</h4>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <p className="card__text">
                Breathtaking hike through the Canadian Banff National Park
              </p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon
                  name="map marker alternate"
                  color={colorConfig[season][2]}
                />
                <span>Banff, Canada</span>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon
                  name="calendar alternate"
                  color={colorConfig[season][2]}
                />
                <span>April 2021</span>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon name="flag" color={colorConfig[season][2]} />
                <span>3 stops</span>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon name="users" color={colorConfig[season][2]} />
                <span>25 people</span>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <div className="card__footer">
        <Grid>
          <Grid.Row>
            <Grid.Column width="10">
              <Label as="div" tag size="big">
                <Icon name="dollar sign" />
                <span className="card__footer-value">297</span>
                <span className="card__footer-text">per person</span>
              </Label>
              <Label as="div" tag size="big">
                <Icon name="star" />
                <span className="card__footer-value">4.9</span>
                <span className="card__footer-text">rating (21)</span>
              </Label>
            </Grid.Column>

            <Grid.Column width="6">
              <CustomBtn
                linkTo="/tour/test"
                classes="custom-btn"
                rgb={colorConfig[season][1]}
              >
                Details
              </CustomBtn>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Card;
