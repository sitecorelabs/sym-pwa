import React from 'react';
import { Link } from '@sitecore-jss/sitecore-jss-react';
import { Link as RouterLink } from 'react-router-dom';

/** React component that turns Sitecore link values that start with / into react-router route links */
export const RoutableSitecoreLink = (props) => {
  const hasValidHref = props.field && props.field.value && props.field.value.href;
  const isEditing = props.editable && props.field.value.editable;

  // only want to apply the routing link if not editing (if editing, need to render editable link value)
  if (hasValidHref && !isEditing) {
    const value = props.field.value;

    // determine if a link is a route or not. This logic may not be appropriate for all usages.
    if (value.href.startsWith('/')) {
      return (
        <RouterLink
          to={value.href}
          title={value.title}
          target={value.target}
          className={value.class || props.className}
        >
          {props.children || value.text || value.href}
        </RouterLink>
      );
    }
  }

  return <Link {...props} />;
};
