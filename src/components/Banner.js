import React from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'styled-icons/fa-solid';
import { Link } from 'react-router-dom';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { media } from '../styleHelpers';
import { Button } from './shared/Button';

const { StyledBanner } = getStyledComponents();

export const Banner = ({ fields }) => {
  return (
    <StyledBanner>
      <h2>
        <Text field={fields.title} tag="strong" />
        <br />
        <Text field={fields.subtitle} />
      </h2>
      <Text field={fields.ctaText} tag="p" />
      <Button as={Link} size="large" to="/thetrees">
        <CheckCircle size={26} style={{ marginRight: 16 }} />
        <Text field={fields.ctaButtonText} />
      </Button>
    </StyledBanner>
  );
};

function getStyledComponents() {
  const StyledBanner = styled.div`
    text-align: center;
    max-width: 940px;
    margin: 0 auto;
    overflow: hidden;
    padding: 9em 0 6em 0;

    h2 {
      border: solid 1px rgba(255, 255, 255, 0.25);
      border-left: 0;
      border-right: 0;
      color: #fff;
      color: rgba(255, 255, 255, 0.75);
      font-size: 2.35em;
      font-weight: 700;
      line-height: 1.3em;
      margin: 0 0 1.5em 0;

      strong {
        font-weight: 800;
        color: inherit;
        display: block;
      }

      &:before {
        content: '';
        display: block;
        border-top: solid 1px;
        border-color: #888;
        border-color: rgba(255, 255, 255, 0.25);
        margin: 10px 0 1.25em 0;
      }

      &:after {
        content: '';
        display: block;
        border-bottom: solid 1px;
        border-color: #888;
        border-color: rgba(255, 255, 255, 0.25);
        margin: 1.25em 0 10px 0;
      }
    }

    p {
      text-transform: uppercase;
      color: #fff;
      color: rgba(255, 255, 255, 0.75);
      font-size: 1.5em;
      font-weight: 700;
      line-height: 1.3em;
      letter-spacing: 0.04em;
      float: left;
      text-align: right;
      width: 60%;
      line-height: 1.5em;
      margin: 0;
    }
    ${media.large.down`
    width: 100%;
    padding: 4em 0 2em 0;

    h2 {
      font-size: 2.2em;
      line-height: 1.3em;
      margin: 0 0 1em 0;
    }

    p {
      font-size: 1.25em;
      line-height: 1.75em;
      letter-spacing: 0.04em;
      float: none;
      text-align: center;
      width: 100%;
      margin: 0 0 2em 0;
    }
  `};
    ${media.medium.down`
    padding: 8em 0 4em 0;
    br {
      display: none;
    }
  `};
    ${media.small.down`
    padding: 40px 20px 40px 20px;
    h2 {
      font-size: 18pt !important;
    }
  `};
  `;

  return {
    StyledBanner,
  };
}
