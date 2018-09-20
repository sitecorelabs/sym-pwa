import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Column } from 'react-rasta';
import { media } from '../styleHelpers';
import { Container } from './shared/Container';
import { Button } from './shared/Button';
import bg03 from '../assets/bg03.png';
import bg02 from '../assets/bg02.png';

const { FooterWrapper, StyledFooter } = getStyledComponents();

export const Footer = (props) => {
  return (
    <FooterWrapper>
      <StyledFooter>
        <Container>
          <Row>
            <Column size={{ xs: 12, md: 6, lg: 3 }}>
              <section>
                <h2>Filler Links</h2>
                <ul className="divided">
                  <li>
                    <a href="#">Quam turpis feugiat dolor</a>
                  </li>
                  <li>
                    <a href="#">Amet ornare in hendrerit </a>
                  </li>
                  <li>
                    <a href="#">Semper mod quisturpis nisi</a>
                  </li>
                  <li>
                    <a href="#">Consequat etiam phasellus</a>
                  </li>
                  <li>
                    <a href="#">Amet turpis, feugiat et</a>
                  </li>
                  <li>
                    <a href="#">Ornare hendrerit lectus</a>
                  </li>
                  <li>
                    <a href="#">Semper mod quis et dolore</a>
                  </li>
                  <li>
                    <a href="#">Amet ornare in hendrerit</a>
                  </li>
                  <li>
                    <a href="#">Consequat lorem phasellus</a>
                  </li>
                  <li>
                    <a href="#">Amet turpis, feugiat amet</a>
                  </li>
                  <li>
                    <a href="#">Semper mod quisturpis</a>
                  </li>
                </ul>
              </section>
            </Column>
            <Column size={{ xs: 12, md: 6, lg: 3 }}>
              <section>
                <h2>More Filler</h2>
                <ul className="divided">
                  <li>
                    <a href="#">Quam turpis feugiat dolor</a>
                  </li>
                  <li>
                    <a href="#">Amet ornare in in lectus</a>
                  </li>
                  <li>
                    <a href="#">Semper mod sed tempus nisi</a>
                  </li>
                  <li>
                    <a href="#">Consequat etiam phasellus</a>
                  </li>
                </ul>
              </section>

              <section>
                <h2>Even More Filler</h2>
                <ul className="divided">
                  <li>
                    <a href="#">Quam turpis feugiat dolor</a>
                  </li>
                  <li>
                    <a href="#">Amet ornare hendrerit lectus</a>
                  </li>
                  <li>
                    <a href="#">Semper quisturpis nisi</a>
                  </li>
                  <li>
                    <a href="#">Consequat lorem phasellus</a>
                  </li>
                </ul>
              </section>
            </Column>
            <Column size={{ xs: 12, lg: 6 }}>
              <section>
                <h2>
                  <strong>ZeroFour</strong> by HTML5 UP
                </h2>
                <p>
                  Hi! This is <strong>ZeroFour</strong>, a free, fully responsive HTML5 site
                  template by <a href="http://twitter.com/ajlkn">AJ</a> for{' '}
                  <a href="http://html5up.net/">HTML5 UP</a>. It's{' '}
                  <a href="http://html5up.net/license/">Creative Commons Attribution</a>
                  licensed so use it for any personal or commercial project (just credit us for the
                  design!).
                </p>
                <a href="#" className="button alt icon fa-arrow-circle-right">
                  Learn More
                </a>
              </section>

              <section>
                <h2>Get in touch</h2>
                <Row>
                  <Column size={{ xs: 12, sm: 6 }}>
                    <dl className="contact">
                      <dt>Twitter</dt>
                      <dd>
                        <a href="#">@untitled-corp</a>
                      </dd>
                      <dt>Facebook</dt>
                      <dd>
                        <a href="#">facebook.com/untitled</a>
                      </dd>
                      <dt>WWW</dt>
                      <dd>
                        <a href="#">untitled.tld</a>
                      </dd>
                      <dt>Email</dt>
                      <dd>
                        <a href="#">user@untitled.tld</a>
                      </dd>
                    </dl>
                  </Column>
                  <Column size={{ xs: 12, sm: 6 }}>
                    <dl className="contact">
                      <dt>Address</dt>
                      <dd>
                        1234 Fictional Rd
                        <br />
                        Nashville, TN 00000-0000
                        <br />
                        USA
                      </dd>
                      <dt>Phone</dt>
                      <dd>(000) 000-0000</dd>
                    </dl>
                  </Column>
                </Row>
              </section>
            </Column>
            <Column size={{ xs: 12 }}>
              <div id="copyright">
                <ul className="menu">
                  <li>&copy; Untitled. All rights reserved</li>
                  <li>
                    Design: <a href="http://html5up.net">HTML5 UP</a>
                  </li>
                </ul>
              </div>
            </Column>
          </Row>
        </Container>
      </StyledFooter>
    </FooterWrapper>
  );
};

Footer.propTypes = {};

function getStyledComponents() {
  const FooterWrapper = styled.div`
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${bg03}),
      url(${bg02});
    position: relative;
    background-repeat: repeat-x, no-repeat, repeat;
    background-size: 100% 100%, 100% 15em, auto auto;
    background-position: top left, top center, top left;
    padding: 7em 0 7em 0;
    ${media.large.down`
      padding: 4.5em 0 4.5em 0;
    `};
    ${media.small.down`
      padding: 3em 20px 3em 20px;
      section, article {
        margin-bottom: 3em !important;
      }
    `};
  `;

  const StyledFooter = styled.footer`
    margin-bottom: 0;
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 2;
    h2 {
      font-size: 1.35em;
      color: #fff;
    }

    strong {
      color: #fff;
    }

    a {
      color: #acb2bf;
    }

    .button.alt {
      box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.75),
        inset 0px 2px 1px 0px rgba(255, 255, 255, 0.25);
    }

    ul {
      &.divided li,
      &.menu li {
        border-color: #444;
        border-color: rgba(255, 255, 255, 0.075);
      }

      &.divided li a {
        text-decoration: none;
      }

      &.menu {
        margin: 0;
      }
    }

    dl.contact dt {
      color: #ddd;
    }
  `;

  return {
    FooterWrapper,
    StyledFooter,
  };
}
