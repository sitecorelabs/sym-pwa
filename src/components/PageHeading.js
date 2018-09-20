import React from 'react';
import styled from 'styled-components';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const StyledHeader = styled.header`
  border-bottom: solid 1px #dbdbdb;
  margin: 0 0 3em 0;

  &:after {
    content: '';
    display: block;
    border-top: solid 1px #dbdbdb;
    height: 8px;
  }

  h2 {
    margin: 0 0 1.2em 0;
    font-size: 2.5em;
  }

  p {
    display: block;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.065em;
    font-size: 0.9em;
    color: #696969;
    margin: 0 0 1.5em 0;
    position: relative;
    top: -1em;

    strong {
      color: #404248;
      font-weight: 800;
    }
  }
`;

export const PageHeading = (props) => (
  <StyledHeader>
    <Text field={props.fields.title} tag="h2" />
    <Text field={props.fields.subtitle} tag="p" />
  </StyledHeader>
);
