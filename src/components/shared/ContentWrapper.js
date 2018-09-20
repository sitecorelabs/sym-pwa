import React from 'react';
import styled, { css } from 'styled-components';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { media } from '../../styleHelpers';
import bg02 from '../../assets/bg02.png';
import bg03 from '../../assets/bg03.png';
import bg04 from '../../assets/bg04.png';
import { Container } from './Container';

const baseWrapper = css`
  padding: 7em 0 7em 0;
  ${media.large.down`padding: 4.5em 0 4.5em 0;`};
  ${media.small.down`padding: 3em 20px 3em 20px;`};
`;

const styleVariant = (props) => {
  switch (props.styleVariant) {
    case 'style1': {
      return css`
        position: relative;
        text-shadow: 1px 1px 0 #fff;
        background-color: #fff;
        background-image: url(${bg03}), url(${bg04}), url(${bg02});
        background-repeat: no-repeat, no-repeat, repeat;
        background-size: 100% 15em, 100% 15em, auto auto;
        background-position: top center, bottom center, top left;
      `;
    }
    case 'style2': {
      return '';
    }
    case 'style3': {
      return css`
        position: relative;
        text-shadow: 1px 1px 0 #fff;
        background-color: #fff;
        background-image: url(${bg03}), url(${bg02});
        background-repeat: no-repeat, repeat;
        background-size: 100% 15em, auto auto;
        background-position: top center, top left;
      `;
    }
  }
};

const OuterWrapper = styled.div`
  ${baseWrapper} ${styleVariant};
`;

export const ContentWrapper = ({ children, rendering, ...otherProps }) => {
  return (
    <OuterWrapper {...otherProps}>
      <Container>
        {children ? children : <Placeholder name="jss-content" rendering={rendering} />}
      </Container>
    </OuterWrapper>
  );
};
