import React from 'react';
import { Icon, Grid, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import CustomBtn from '../../../utils/CustomBtn';
import { colorConfig } from '../../..//utils';

const CardPictureOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-blend-mode: screen;
  background-size: cover;
  background-image: linear-gradient(
      to bottom right,
      rgb(${props => colorConfig[props.season][0]}),
      rgb(${props => colorConfig[props.season][1]})
    ),
    url(${props => props.imgUrl});
`;

const Card = props => {
  const {
    season,
    name,
    difficulty,
    duration,
    summary,
    price,
    maxGroupSize,
    ratingsAverage,
    ratingsQuantity,
    locations,
    startDates,
    startLocation,
    slug,
    imageCover
  } = props;

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <CardPictureOverlay
            season={season}
            imgUrl={`${process.env.PUBLIC_URL}/img/tours/${imageCover}`}
          ></CardPictureOverlay>
        </div>

        <h3 className="heading-tertiary">
          <span
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(${colorConfig[season][0]}, 0.87), rgba(${colorConfig[season][1]}, 0.87))`
            }}
          >
            {name}
          </span>
        </h3>
      </div>

      <div className="card__details">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h4 className="card__sub-heading">{`${difficulty} ${duration}-day tour`}</h4>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <p className="card__text">{summary}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon
                  name="map marker alternate"
                  color={colorConfig[season][2]}
                />
                <span>{startLocation.description}</span>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon
                  name="calendar alternate"
                  color={colorConfig[season][2]}
                />
                <span>
                  {new Date(startDates[0]).toLocaleString('en-us', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon name="flag" color={colorConfig[season][2]} />
                <span>{locations.length} stops</span>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="card__data">
                <Icon name="users" color={colorConfig[season][2]} />
                <span>{maxGroupSize} people</span>
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
                <span className="card__footer-value">{price}</span>
                <span className="card__footer-text">per person</span>
              </Label>
              <Label as="div" tag size="big">
                <Icon name="star" />
                <span className="card__footer-value">{ratingsAverage}</span>
                <span className="card__footer-text">
                  rating ({ratingsQuantity})
                </span>
              </Label>
            </Grid.Column>

            <Grid.Column width="6">
              <CustomBtn
                linkTo={`/tour/${slug}`}
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
