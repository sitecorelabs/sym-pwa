import React from 'react';
import styled, { css } from 'styled-components';
import bg02 from '../../assets/bg02.png';
import { media } from '../../styleHelpers';

const size = (props) => {
  switch (props.size) {
    case 'medium': {
      return css`
        font-size: 1.25em;
        padding: 1em 2.25em;
      `;
    }
    case 'large': {
      return css`
        font-size: 1.5em;
        padding: 1em 2.25em;
      `;
    }
    default: {
      return css`
        font-size: 0.95em;
        padding: 1em 2em;
      `;
    }
  }
};

const styleVariant = (props) => {
  switch (props.styleVariant) {
    case 'alt': {
      return css`
        background-color: #464a52;

        &:hover {
          background-color: #565a62;
        }

        &:active {
          background-color: #363a42;
        }
      `;
    }
    default: {
      return css`
        background-color: #4091bf;
        &:hover {
          background-color: #50a1cf;
        }

        &:active {
          background-color: #3081af;
        }
      `;
    }
  }
};

// Use a 'polymoprhic' component so that we can explicitly declare which props are used for
// the styled component while `otherProps` are forwarded to the underlying component.
// This helps when using, for instance, the react-router `Link` component.
// Without the intermediate polymorph, all props would be forwarded to the `Link` component.
// So it would received `featured`, `left`, `center` and try to attach them to the rendered DOM element.
// In doing so, a warning will be thrown that, for example, `featured` is not a valid attribute or has an
// invalid attribute value.
// https://github.com/styled-components/styled-components/issues/1956#issuecomment-416591046
const Polymorph = ({ as: Component = 'button', size, styleVariant, ...otherProps }) => {
  return <Component {...otherProps} />;
};

export const Button = styled(Polymorph)`
  background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), url(${bg02});
  transition: background-color 0.2s ease-in-out;
  -webkit-appearance: none;
  position: relative;
  display: inline-block;
  border-radius: 8px;
  box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.35),
    inset 0px 2px 1px 0px rgba(255, 255, 255, 0.35);
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5);
  color: #fff !important;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.075em;
  outline: 0;
  border: 0;
  white-space: nowrap;
  cursor: pointer;
  ${size} ${styleVariant};
  svg {
    vertical-align: text-bottom;
  }

  ${media.small.down`
    width: 100%;
    font-size: 1.1em;
    text-align: center;
    padding: 1em 0 1em 0;
    border-radius: 8px;
  `};
`;
