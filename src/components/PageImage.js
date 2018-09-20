import React from 'react';
import { Image, RichText } from '@sitecore-jss/sitecore-jss-react';
import { ImageWrapper } from './shared/ImageWrapper';

export const PageImage = (props) => (
  <React.Fragment>
    <ImageWrapper as="span" featured>
      <Image field={props.fields.image} />
    </ImageWrapper>

    <RichText field={props.fields.description} />
  </React.Fragment>
);
