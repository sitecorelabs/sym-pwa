import React from 'react';
import { User, Cog, ChartBar } from 'styled-icons/fa-solid';

const icons = new Map();
icons.set('user', User);
icons.set('cog', Cog);
icons.set('chartBar', ChartBar);

export const IconFactory = ({ iconName, ...otherProps }) => {
  const Component = icons.get(iconName);
  return <Component {...otherProps} />;
};
