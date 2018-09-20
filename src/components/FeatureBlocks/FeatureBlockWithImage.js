import React from 'react';
import { Text, Image } from '@sitecore-jss/sitecore-jss-react';
import { ImageWrapper } from '../shared/ImageWrapper';
import { RoutableSitecoreLink } from '../shared/RoutableSitecoreLink';
import { IconFactory } from '../shared/IconFactory';

export const FeatureBlockWithImage = (props) => {
  return (
    <section>
      <ImageWrapper as={RoutableSitecoreLink} field={props.fields.imageLink} featured editable>
        <Image field={props.fields.image} />
      </ImageWrapper>
      <IconFactory iconName={props.fields.icon.value} size={48} />
      <header>
        <Text field={props.fields.title} tag="h3" />
        <Text field={props.fields.subtitle} tag="p" />
      </header>
    </section>
  );
};
