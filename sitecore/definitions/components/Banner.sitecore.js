// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default function(manifest) {
  manifest.addComponent({
    name: 'Banner',
    displayName: 'Banner',
    // totally optional, but fun
    icon: SitecoreIcon.Banana,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'subtitle', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaText', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaButtonText', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaButtonUrl', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
