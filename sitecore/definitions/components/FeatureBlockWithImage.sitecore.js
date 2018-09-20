// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default function(manifest) {
  manifest.addComponent({
    name: 'FeatureBlockWithImage',
    displayName: 'FeatureBlockWithImage',
    // totally optional, but fun
    icon: SitecoreIcon.Airplane,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'subtitle', type: CommonFieldTypes.SingleLineText },
      { name: 'icon', type: CommonFieldTypes.SingleLineText },
      { name: 'imageLink', type: CommonFieldTypes.GeneralLink },
      { name: 'image', type: CommonFieldTypes.Image },
    ],
  });
}
