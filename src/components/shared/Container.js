import styled from 'styled-components';
import { media, breakpoints } from '../../styleHelpers';

export const Container = styled.div`
  margin: 0 auto;
  max-width: ${breakpoints.xlarge}px;
  ${media.large.down`max-width: calc(100% - 100px)`};
  ${media.small.down`max-width:100%;`};
`;
