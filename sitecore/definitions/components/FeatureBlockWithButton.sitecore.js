// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default function(manifest) {
  manifest.addComponent({
    name: 'FeatureBlockWithButton',
    displayName: 'FeatureBlockWithButton',
    // totally optional, but fun
    icon: SitecoreIcon.Airplane2,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'subtitle', type: CommonFieldTypes.SingleLineText },
      { name: 'body', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaLink', type: CommonFieldTypes.GeneralLink },
      { name: 'ctaLinkText', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaStyleVariant', type: CommonFieldTypes.SingleLineText },
    ],
  });
}
