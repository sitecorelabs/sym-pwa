import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';
import { media } from '../styleHelpers';

const navData = [
  { url: '/', title: 'Home' },
  { url: '/Services', title: 'Services' },
  { url: '/Work', title: 'Our Work' },
  { url: '/Contact', title: 'Contact' },
];

const { StyledNav, StyledMobileNav } = getStyledComponents();

class TranslatedNavigation extends React.Component {
  static displayName = 'Navigation';

  static propTypes = {
    mobile: PropTypes.bool,
    t: PropTypes.func,
  };

  static defaultProps = {
    mobile: false,
  };

  renderUnorderedList = (navItems) => {
    return <ul>{navItems.map(this.renderListItem)}</ul>;
  };

  renderListItem = (navItem, index) => {
    return (
      <li key={`listItem${index}`}>
        <NavLink to={navItem.url}>{this.props.t(navItem.title)}</NavLink>
        {navItem.children && navItem.children.length > 0
          ? this.renderUnorderedList(navItem.children)
          : null}
      </li>
    );
  };

  renderLinkList = (navItems, depth = 0) => {
    return navItems.map((navItem, index) => {
      return (
        <React.Fragment key={`navLink${index}`}>
          <NavLink className={`depth-${depth}`} to={navItem.url}>
            {this.props.t(navItem.title)}
          </NavLink>
          {navItem.children && navItem.children.length > 0
            ? this.renderLinkList(navItem.children, depth + 1)
            : null}
        </React.Fragment>
      );
    });
  };

  render() {
    return !this.props.mobile ? (
      <StyledNav>{this.renderUnorderedList(navData)}</StyledNav>
    ) : (
      <StyledMobileNav>{this.renderLinkList(navData)}</StyledMobileNav>
    );
  }
}

// inject dictionary props (`t`) into navigation so we can translate it
// NOTE: using this is needed instead of using i18next directly to keep
// the component state updated when i18n state (e.g. current language) changes

export const Navigation = translate()(TranslatedNavigation);

function getStyledComponents() {
  const StyledNav = styled.nav`
    position: absolute;
    right: 2em;
    top: 0;
    line-height: 5.5em;

    > ul > li {
      float: left;
      padding: 0 0.8em 0 0.8em;

      > {
        a,
        span {
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 800;
          font-size: 0.95em;
          letter-spacing: 0.075em;
          padding: 0.5em 0.8em 0.5em 0.8em;
          border-radius: 6px;
          outline: 0;
        }
      }

      &.active > a,
      &.current_page_item > a,
      &.active > span,
      &.current_page_item > span {
        background: rgba(0, 0, 0, 0.15);
        box-shadow: inset 1px 1px 0px 0px rgba(0, 0, 0, 0.025),
          1px 1px 0px 0px rgba(255, 255, 255, 0.025);
      }

      &:last-child {
        padding-right: 0;
      }

      > ul {
        display: none;
      }
    }
    ${media.medium.down`display:none;`};
  `;

  const StyledMobileNav = styled.nav`
    a {
      display: block;
      color: #aaa;
      text-decoration: none;
      height: 44px;
      line-height: 44px;
      border-top: solid 1px rgba(255, 255, 255, 0.05);
      border-bottom: solid 1px rgba(0, 0, 0, 0.15);
      padding: 0 1em 0 1em;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 0.95em;
      letter-spacing: 0.075em;

      &:first-child {
        border-top: 0;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  `;

  return {
    StyledNav,
    StyledMobileNav,
  };
}
