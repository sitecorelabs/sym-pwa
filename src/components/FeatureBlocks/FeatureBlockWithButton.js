import React from 'react';
import { InfoCircle, ArrowCircleRight } from 'styled-icons/fa-solid';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { Button } from '../shared/Button';
import { RoutableSitecoreLink } from '../shared/RoutableSitecoreLink';

export const FeatureBlockWithButton = (props) => {
  const ctaStyleVariant = props.fields.ctaStyleVariant && props.fields.ctaStyleVariant.value;
  return (
    <section>
      <header>
        <Text field={props.fields.title} tag="h2" />
        <Text field={props.fields.subtitle} tag="p" />
      </header>
      <Text field={props.fields.body} tag="p" />
      <footer>
        <Button
          as={RoutableSitecoreLink}
          field={props.fields.ctaLink}
          size="medium"
          styleVariant={ctaStyleVariant}
        >
          {ctaStyleVariant === 'alt' ? <InfoCircle size={22} /> : <ArrowCircleRight size={22} />}
          <Text field={props.fields.ctaLinkText} />
        </Button>
      </footer>
    </section>
  );
};
