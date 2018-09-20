import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

import Helmet from 'react-helmet';
import styled from 'styled-components';

import { media } from './styleHelpers';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

/*
  APP LAYOUT
  This is where the app's HTML structure and root placeholders should be defined.

  All routes share this root layout by default (this could be customized in RouteHandler),
  but components added to inner placeholders are route-specific.
*/

const StyledPageWrapper = styled.div`
  ${media.medium.down`
    backface-visibility: hidden;
    transition: transform 0.5s ease;
    padding-bottom: 1px;
    ${(props) => (props.navPanelVisible ? `transform: translateX(${props.navPanelWidth}px)` : '')}
  `};
`;

const StyledMainWrapper = styled.div`
  background: #fff;
  ${(props) => {
    return props.routeName === 'home'
      ? `${media.medium.down`padding-top: 0;`}`
      : `${media.medium.down`padding-top: 44px;`}`;
  }};
`;

const navPanelWidth = 275;

export class Layout extends React.Component {
  state = {
    navPanelVisible: false,
  };

  handleNavPanelToggleClick = () => {
    this.setState((prevState) => ({ navPanelVisible: !prevState.navPanelVisible }));
  };

  render() {
    const { route } = this.props;
    return (
      <React.Fragment>
        {/* react-helmet enables setting <head> contents, like title and OG meta tags */}
        <Helmet>
          <title>
            {(route.fields && route.fields.pageTitle && route.fields.pageTitle.value) || 'Page'}
          </title>
        </Helmet>

        {/* root placeholder for the app, which we add components to using route data */}
        <StyledPageWrapper
          navPanelWidth={navPanelWidth}
          navPanelVisible={this.state.navPanelVisible}
        >
          <Header
            route={route}
            onNavPanelToggleClick={this.handleNavPanelToggleClick}
            navPanelWidth={navPanelWidth}
            navPanelVisible={this.state.navPanelVisible}
          />
          <StyledMainWrapper>
            <Placeholder name="jss-main" rendering={route} />
          </StyledMainWrapper>
          <Footer route={route} />
        </StyledPageWrapper>
      </React.Fragment>
    );
  }
}
