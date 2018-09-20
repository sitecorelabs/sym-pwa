import { injectGlobal } from 'styled-components';
import bg01 from './assets/bg01.png';
import { media } from './styleHelpers';

export const themeStyles = {
  main: {
    fontFamily: `'Open Sans', sans-serif`,
    color: '#7b818c',
    fontWeight: 400,
    fontSize: {
      xlarge: '11pt',
      large: '10.75pt',
      medium: '10.75pt',
      small: '10pt',
    },
    lineHeight: {
      xlarge: '1.85em',
      large: '1.75em',
      medium: '1.75em',
      small: '1.75em',
    },
    heading: { color: '#404248' },
    date: { color: '#696969' },
  },
};

export const activeTheme = themeStyles.main;

injectGlobal`
  html, body, div, span, applet, object,
	iframe, h1, h2, h3, h4, h5, h6, p, blockquote,
	pre, a, abbr, acronym, address, big, cite,
	code, del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var, b,
	u, i, center, dl, dt, dd, ol, ul, li, fieldset,
	form, label, legend, table, caption, tbody,
	tfoot, thead, tr, th, td, article, aside,
	canvas, details, embed, figure, figcaption,
	footer, header, hgroup, menu, nav, output, ruby,
	section, summary, time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}

  article, aside, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section {
		display: block;
	}

	ol, ul {
		list-style:none;
	}

	blockquote,	q {
		quotes: none;

		&:before,
		&:after {
			content: '';
			content: none;
		}
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	mark {
		background-color: transparent;
		color: inherit;
	}

	input::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	input, select, textarea {
		appearance: none;
	}

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

	@-ms-viewport {
		width: device-width;
	}

  body {
    -webkit-text-size-adjust: none;
    background: #303238 url(${bg01});    
    &.is-preload * {
      transition: none !important;
      animation: none !important;
    }
  }

	body, input, select, textarea {
		font-family: ${activeTheme.fontFamily};
    color: ${activeTheme.color};
    font-weight: ${activeTheme.fontWeight};
    font-size: ${activeTheme.fontSize.xlarge};
    line-height: ${activeTheme.lineHeight.xlarge};
		${media.large.down`
			font-size: ${activeTheme.fontSize.large};
    	line-height: ${activeTheme.lineHeight.large};
		`}
		${media.medium.down`
			font-size: ${activeTheme.fontSize.medium};
    	line-height: ${activeTheme.lineHeight.medium};
		`}
		${media.small.down`
			font-size: ${activeTheme.fontSize.small};
    	line-height: ${activeTheme.lineHeight.small};
		`}
	}

	a {
		color: inherit;
		text-decoration: underline;
		&:hover {
			text-decoration: none;
		}
	}

	h1, h2, h3, h4, h5, h6 {
		text-transform: uppercase;
		font-weight: 800;
		letter-spacing: 0.04em;
		color: ${activeTheme.heading.color};
		margin: 0 0 1em 0;
		${media.small.down`
			font-size: 13pt;
		`}
	}

	h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {
		color: inherit;
		text-decoration: none;
		outline: 0;
	}

	h2 {
		font-size: 2em;
		margin: 0 0 1.5em 0;
		line-height: 1em;
	}

	h3 {
		font-size: 1.35em;
		margin-top: 2em;
	}

	p, ul, ol, dl, table {
		margin-bottom: 2em;
	}

	section, article {
		margin-bottom: 5em;
	}

	section > :last-child,
	article > :last-child,
	section:last-child,
	article:last-child {
		margin-bottom: 0;
	}

	header {
		margin: 0 0 2em 0;
	}

	footer {
		margin: 2.5em 0 0 0;
	}

  /*
    Hides Sitecore Experience Editor markup,
    if you run the app in connected mode while the Sitecore cookies
    are set to edit mode.
  */
  .scChromeData, .scpm { display: none !important; }
`;
