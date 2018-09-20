import { css } from 'styled-components';

const gridBreakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const mediaDefault = '@media screen and ';

const helpers = (min, max) => {
  return {
    up: (...args) => css`${mediaDefault}(min-width: ${min}px) { ${css(...args)} }`,
    down: (...args) => css`${mediaDefault}(max-width: ${max}px) { ${css(...args)} }`,
    only: (...args) =>
      css`${mediaDefault}(min-width: ${min}px) and (max-width: ${max}px) { ${css(...args)} }`,
  };
};

export const breakpoints = {
  xlarge: gridBreakpoints.xl.replace('px', ''),
  large: gridBreakpoints.lg.replace('px', ''),
  medium: gridBreakpoints.md.replace('px', ''),
  small: gridBreakpoints.sm.replace('px', ''),
};

export const media = {
  xlarge: { ...helpers(breakpoints.xlarge, 9999) },
  large: { ...helpers(breakpoints.large, breakpoints.xlarge - 1) },
  medium: { ...helpers(breakpoints.medium, breakpoints.large - 1) },
  small: { ...helpers(breakpoints.small, breakpoints.medium - 1) },
};
