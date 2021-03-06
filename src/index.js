import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoot from './AppRoot';
import { setServerSideRenderingState } from './RouteHandler';
import GraphQLClientFactory from './lib/GraphQLClientFactory';
import config from './temp/config';
import registerServiceWorker from './registerServiceWorker';

/* eslint-disable no-underscore-dangle */

let renderFunction = ReactDOM.render;

/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the server will provide the window.__JSS_STATE__ object
  for us to acquire the initial state to run with on the client.

  This enables us to skip a network request to load up the layout data.

  SSR is initiated from /server/server.js.
*/
if (window.__JSS_STATE__) {
  // push the initial SSR state into the route handler, where it will be used
  setServerSideRenderingState(window.__JSS_STATE__);

  // when React initializes from a SSR-based initial state, you need to render with `hydrate` instead of `render`
  renderFunction = ReactDOM.hydrate;
}

/*
  GraphQL Data
  The Apollo Client needs to be initialized to make GraphQL available to the JSS app.
  Not using GraphQL? Remove this, and the ApolloContext from `AppRoot`.
*/
// Apollo supports SSR of GraphQL queries, so like JSS SSR, it has an object we can pre-hydrate the client cache from
// to avoid needing to re-run GraphQL queries after the SSR page loads
const initialGraphQLState =
  window.__JSS_STATE__ && window.__JSS_STATE__.APOLLO_STATE
    ? window.__JSS_STATE__.APOLLO_STATE
    : null;

const graphQLClient = GraphQLClientFactory(config.graphQLEndpoint, false, initialGraphQLState);

/*
  App Rendering
*/
// HTML element to place the app into
const rootElement = document.getElementById('root');

renderFunction(
  <AppRoot path={window.location.pathname} Router={BrowserRouter} graphQLClient={graphQLClient} />,
  rootElement
);

registerServiceWorker();
