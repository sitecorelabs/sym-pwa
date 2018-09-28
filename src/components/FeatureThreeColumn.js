import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Row, Column } from 'react-rasta';
import { Placeholder, Text, RichText } from '@sitecore-jss/sitecore-jss-react';

import { media } from '../styleHelpers';
import { ContentWrapper } from './shared/ContentWrapper';

const { StyledRow, FeatureHeader, StyledColumn } = getStyledComponents();

export const FeatureThreeColumn = (props) => {
  return (
    <ContentWrapper styleVariant="style1">
      <StyledRow>
        <Column size={12}>
          <FeatureHeader>
            <Text field={props.fields.title} tag="h2" />
            <Text field={props.fields.subtitle} tag="p" encode={false} />
          </FeatureHeader>
        </Column>
      </StyledRow>
      <StyledRow>
        <StyledColumn size={{ xs: 12, md: 4 }}>
          <Placeholder name="jss-column1" rendering={props.rendering} />
        </StyledColumn>
        <StyledColumn size={{ xs: 12, md: 4 }}>
          <Placeholder name="jss-column2" rendering={props.rendering} />
        </StyledColumn>
        <StyledColumn size={{ xs: 12, md: 4 }}>
          <Placeholder name="jss-column3" rendering={props.rendering} />
        </StyledColumn>
      </StyledRow>
      <StyledRow>
        <Column size={12}>
          <RichText field={props.fields.content} />
        </Column>
      </StyledRow>
    </ContentWrapper>
  );
};

FeatureThreeColumn.propTypes = {
  rendering: PropTypes.object,
  fields: PropTypes.object,
};

function getStyledComponents() {
  const StyledRow = styled(Row)`
    margin-bottom: 50px;
    ${media.medium.down`margin-bottom: 25px;`};
    ${media.small.down`margin-bottom: 15px;`};
  `;

  const headerP = css`
    display: block;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.065em;
    font-size: 0.9em;
    color: #696969;
    margin: 0;

    strong {
      color: #404248;
      font-weight: 800;
    }
  `;

  const StyledColumn = styled(Column)`
    text-align: center;

    svg {
      margin-right: 24px;
    }

    header {
      position: relative;
      display: inline-block;
      text-align: left;
      margin: 0 auto;
      h3 {
        margin: 0 0 0.25em 0;
      }
      p {
        ${headerP};
      }
    }
  `;

  const FeatureHeader = styled.header`
    border-bottom: solid 1px #dbdbdb;
    margin: 0 0 3em 0;
    text-align: center;

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
      ${headerP} margin: 0 0 1.5em 0;
      position: relative;
      top: -1em;
      font-size: 1.2em;
    }
  `;

  return {
    StyledRow,
    StyledColumn,
    FeatureHeader,
  };
}
