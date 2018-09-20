import React from 'react';
import styled, { css } from 'styled-components';
import bg01 from '../../assets/bg01.png';

const baseWrapper = css`
  position: relative;
  display: inline-block;
  img {
    display: block;
    width: 100%;
    border-radius: 8px;
    max-width: 100%;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background: url(${bg01});
    width: 100%;
    height: 100%;
    opacity: 0.75;
  }
`;

const featured = (props) => {
  return (
    props.featured &&
    css`
      display: block;
      width: 100%;
      margin: 0 0 2.5em 0;
    `
  );
};

const left = (props) => {
  return (
    props.left &&
    css`
      float: left;
      margin: 0 2em 2em 0;
    `
  );
};

const centered = (props) => {
  return (
    props.centered &&
    css`
      display: block;
      margin: 0 0 2.5em 0;
      img {
        margin: 0 auto;
        width: auto;
      }
    `
  );
};

// Use a 'polymoprhic' component so that we can explicitly declare which props are used for
// the styled component while `otherProps` are forwarded to the underlying component.
// This helps when using, for instance, the react-router `Link` component.
// Without the intermediate polymorph, all props would be forwarded to the `Link` component.
// So it would received `featured`, `left`, `center` and try to attach them to the rendered DOM element.
// In doing so, a warning will be thrown that, for example, `featured` is not a valid attribute or has an
// invalid attribute value.
// https://github.com/styled-components/styled-components/issues/1956#issuecomment-416591046
const Polymorph = ({ as: Component = 'a', featured, left, center, ...otherProps }) => {
  return <Component {...otherProps} />;
};

export const ImageWrapper = styled(Polymorph)`
  ${baseWrapper}
  ${featured}
  ${left}
  ${centered}
`;
