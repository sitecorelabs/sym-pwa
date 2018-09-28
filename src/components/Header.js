import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Bars } from 'styled-icons/fa-solid';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Link as RouterLink } from 'react-router-dom';

import { media, breakpoints } from '../styleHelpers';
import { Navigation } from './Navigation';
import { Container } from './shared/Container';
import { ServiceWorkerNotifications } from '../ServiceWorkerNotifications';

import bg01 from '../assets/bg01.png';
import bg02 from '../assets/bg02.png';
import headerImg from '../assets/images/header.jpg';

const SmallHeader = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

const { StyledHeaderWrapper, LargeHeader, TitleBar, NavPanel } = getStyledComponents();

export class Header extends React.Component {
  render() {
    const { onNavPanelToggleClick, navPanelVisible, navPanelWidth, ...otherProps } = this.props;
    return (
      <StyledHeaderWrapper routeName={otherProps.route.name}>
        <Container>
          <LargeHeader>
            <div className="inner">
              <h1>
                <RouterLink to="/">{`//* Solutions`}</RouterLink>
              </h1>
              <Navigation {...otherProps} />
            </div>
          </LargeHeader>
          <SmallHeader>
            {/*
              We need to portal these elements because the page wrapper is shifted right
              when the nav panel is visible. If the nav panel and title are nested within
              the page wrapper, they are shifted as well. So we "un-nest" them with portals.
            */}
            {typeof window !== 'undefined'
              ? ReactDOM.createPortal(
                  <React.Fragment>
                    <style type="text/css">
                      {TitleBar({
                        navPanelVisible,
                        navPanelWidth,
                      })}
                    </style>
                    <section className="header-title-bar">
                      <button
                        className="toggle"
                        onClick={onNavPanelToggleClick}
                        aria-label="Toggle Navigation Menu"
                      >
                        <Bars size={18} />
                      </button>
                      <span className="title">Whack Whack Star Solutions</span>
                    </section>
                  </React.Fragment>,
                  document.querySelector('body')
                )
              : null}
            {typeof window !== 'undefined'
              ? ReactDOM.createPortal(
                  <React.Fragment>
                    <style type="text/css">
                      {NavPanel({
                        visible: navPanelVisible,
                        width: navPanelWidth,
                      })}
                    </style>
                    <section className="nav-panel-mobile">
                      <Navigation {...otherProps} mobile />
                    </section>
                  </React.Fragment>,
                  document.querySelector('body')
                )
              : null}
          </SmallHeader>
          <ServiceWorkerNotifications />
          {otherProps.route.name === 'home' ? (
            <Placeholder name="jss-header-banner" rendering={otherProps.route} />
          ) : null}
        </Container>
      </StyledHeaderWrapper>
    );
  }
}

function getStyledComponents() {
  const components = {};

  components.StyledHeaderWrapper = styled.div`
    background: url(${bg01}), url(${headerImg});
    background-position: top left, center center;
    background-size: auto, cover;
    padding: 3em 0;
    ${media.large.down`
    padding: 2em 0;
    height: auto;
  `};
    ${(props) => {
      if (props.routeName === 'home') {
        return `
          ${media.medium.down`display: block; padding-top: 44px;`}
          ${media.small.down`background-position: 35% 50%;`}
        `;
      } else {
        return `${media.medium.down`display: none;`}`;
      }
    }};
  `;

  components.LargeHeader = styled.header`
    position: relative;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75em;
    margin-bottom: 0;
    .inner {
      background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)), url(${bg02});
      position: relative;
      height: 5.5em;
      background-color: #3b3e45;
      background-color: rgba(59, 62, 69, 0.9);
      border-radius: 8px;
      box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.45),
        inset 0px 2px 1px 0px rgba(255, 255, 255, 0.15);
      text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5);
    }

    h1 {
      position: absolute;
      left: 1.75em;
      top: 50%;
      margin-top: -0.65em;
      font-size: 1.5em;
      a {
        color: #fff;
      }
    }
    ${media.medium.down`display:none;`};
  `;

  components.TitleBar = (props) => {
    return `
    .header-title-bar {
      backface-visibility: hidden;
      background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)), url(${bg02});
      transition: transform 0.5s ease;
      ${props.navPanelVisible ? `transform: translateX(${props.navPanelWidth}px);` : ''}
      background-color: rgba(59, 62, 69, 0.9);
      box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.5),
        inset 0px 0px 0px 2px rgba(255, 255, 255, 0.075), 0px 1px 6px 0px rgba(0, 0, 0, 0.35);
      display: block;
      height: 44px;
      left: 0;
      position: fixed;
      text-shadow: -1px -1px 0 rgba(0, 0, 0, 1);
      top: 0;
      width: 100%;
      z-index: 10001;      
    }

    @media screen and (min-width: ${breakpoints.large}px) {
      .header-title-bar {
        display: none;
      }
    }

    .header-title-bar .title {
      display: block;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #fff;
      line-height: 44px;
      text-align: center;
    }

    .header-title-bar .toggle {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 44px;
      opacity: 0.25;
      background: none;
      border: none;
      outline: none;
    }

    .header-title-bar .toggle:active {
      opacity: 0.5;
    }

    .header-title-bar svg {
      color: #fff;
    }
  `;
  };

  components.NavPanel = (props) => {
    const className = '.nav-panel-mobile';
    return `
      ${className} {
        backface-visibility: hidden;
        background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)), url(${bg01});
        transform: translateX(${props.visible ? 0 : -props.width}px);
        transition: transform 0.5s ease;
        background-color: #303238;
        box-shadow: inset -1px 0px 0px 0px rgba(0, 0, 0, 0.5),
          inset -2px 0px 0px rgba(255, 255, 255, 0.15), inset -2px 0px 10px 0px rgba(0, 0, 0, 0.35);
        display: block;
        height: 100%;
        left: 0;
        overflow-y: auto;
        position: fixed;
        top: 0;
        width: ${props.width}px;
        z-index: 10002;
      }

      ${className} .indent-1 {
        display: inline-block;
        width: 1em;
      }

      ${className} .indent-2 {
        display: inline-block;
        width: 2em;
      }

      ${className} .indent-3 {
        display: inline-block;
        width: 3em;
      }

      ${className} .indent-4 {
        display: inline-block;
        width: 4em;
      }

      ${className} .indent-5 {
        display: inline-block;
        width: 5em;
      }

      ${className} .depth-0 {
        color: #fff;
      }
    `;
  };

  return components;
}
