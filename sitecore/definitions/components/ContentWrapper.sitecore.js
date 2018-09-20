// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default function(manifest) {
  manifest.addComponent({
    name: 'ContentWrapper',
    displayName: 'ContentWrapper',
    // totally optional, but fun
    icon: SitecoreIcon.PostageStamp,
    placeholders: ['jss-content'],
  });
}
