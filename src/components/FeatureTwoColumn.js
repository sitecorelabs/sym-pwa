import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Column } from 'react-rasta';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { media } from '../styleHelpers';
import { ContentWrapper } from './shared/ContentWrapper';

const { StyledRow, StyledColumn } = getStyledComponents();

export const FeatureTwoColumn = (props) => {
  return (
    <ContentWrapper styleVariant="style2">
      <StyledRow>
        <StyledColumn size={{ xs: 12, lg: 6 }}>
          <Placeholder name="jss-column1" rendering={props.rendering} />
        </StyledColumn>
        <StyledColumn size={{ xs: 12, lg: 6 }}>
          <Placeholder name="jss-column2" rendering={props.rendering} />
        </StyledColumn>
      </StyledRow>
    </ContentWrapper>
  );
};

FeatureTwoColumn.propTypes = {};

function getStyledComponents() {
  const StyledRow = styled(Row)`
    margin-bottom: 50px;
    ${media.medium.down`margin-bottom: 25px;`};
    ${media.small.down`margin-bottom: 15px;`};
  `;

  const StyledColumn = styled(Column)`
    text-align: center;
    svg {
      margin-right: 24px;
    }

    header {
      position: relative;
      margin: 0 auto;
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
    }
  `;

  return {
    StyledRow,
    StyledColumn,
  };
}
