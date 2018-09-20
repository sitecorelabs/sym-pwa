import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

export const PageBody = (props) => (
  <React.Fragment>
    <Text field={props.fields.title} tag="h3" />
    <RichText field={props.fields.body} />
  </React.Fragment>
);
