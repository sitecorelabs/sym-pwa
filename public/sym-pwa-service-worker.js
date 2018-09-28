// The workbox script and precache-manifest script will be injected by the webpack plugin
// at the top of this file at build time.
// This file will not be directly modified, the plugin creates a copy for the build and
// then injects the `importScripts()` call into the copy.
// e.g. importScripts("/precache-manifest.4affd940f3c329eff36340f77ce10d43.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");
// https://developers.google.com/web/tools/workbox/guides/precache-files/webpack
// import config from '../src/temp/config';
/////////// EVERYTHING BELOW THIS LINE IS CUSTOMIZABLE /////////////

workbox.skipWaiting();
workbox.clientsClaim();

// The precache manifest script that is generated and injected by webpack
// exposes `self.__precacheManifest` as a variable.
// `self.__precacheManifest` contains an array of artifacts emitted by webpack, e.g.
/*
  self.__precacheManifest = [
    { "revision": "2324e6ee822973bf295f", "url": "/dist/sym-pwa/static/js/vendors.2324e6ee.chunk.js" },
    { "revision": "6d6b99d453cd46835207", "url": "/dist/sym-pwa/static/js/main.6d6b99d4.chunk.js" },
    { "revision": "6d6b99d453cd46835207", "url": "/dist/sym-pwa/static/css/main.1f224033.chunk.css" },
    { "revision": "c17af19582c9e401c60ef58245f3ff19", "url": "/dist/sym-pwa/index.html" }
  ];
*/
// By default, all webpack artifacts in the precacheManifest are added to the precache
// via `workbox.precaching.precacheAndRoute`. More info on precaching here:
// https://developers.google.com/web/tools/workbox/modules/workbox-precaching
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// workbox.routing.registerNavigationRoute('/', {
//   blacklist: [/^\/__/, /\/[^\/]+.[^\/]+$/],
// });

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// The following plugin is for use with the stale-while-revalidate strategy that we'll
// use for caching Layout Service responses.
// When the Layout Service cache is updated, we determine if the cached response differs
// from the new response.
// If so, post a message containing updated response data to any listening clients.
// https://developers.google.com/web/tools/workbox/guides/using-plugins
const postMessagePlugin = {
  cacheDidUpdate: async ({ cacheName, request, oldResponse, newResponse }) => {
    console.log('cacheDidUpdate', request);

    // Use whatever logic you want to determine whether the responses differ.
    if (oldResponse && oldResponse.headers.get('etag') !== newResponse.headers.get('etag')) {
      const clients = await self.clients.matchAll();
      // We want access to the new response body, however the response stream
      // has already been read at this point. So we obtain a fresh copy
      // of the response stream and get the body as JSON.
      // This approach is suggested via the code comments here:
      // https://developers.google.com/web/tools/workbox/guides/using-plugins#custom_plugins
      const freshResponse = await caches.match(request, {
        cacheName,
      });
      const newResponseBody = await freshResponse.json();
      for (const client of clients) {
        // `message` must be a serializable object. Note that `Response` objects can't be serialized.
        const message = { type: 'layout-service-cache-updated', cacheName, data: newResponseBody };
        console.log('posting message', message);
        client.postMessage(message);
      }
    }
  },
};

// The stale-while-revalidate strategy allows you to respond toa request as quickly as possible with a
// cached response if available, falling back to the network request if it's not cached.
// The network request is then used to update the cache.
// If the cache is updated, we post a message to the client so it can update stale data if needed.
// https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
const layoutServiceStrategy = workbox.strategies.staleWhileRevalidate({
  plugins: [postMessagePlugin],
  cacheName: 'sitecore-layout-service',
});

// We need to register the Layout Service route pattern to ensure the service worker caches
// the Layout Service response.
// We use a simple match function to determine if a route matches the Layout Service pattern.
// The match function is a simpler/more convenient way to use the same URL pattern for
// both disconnected and CORS (connected mode) requests to Layout Service.
// Otherwise, if you use a workbox.RegExpRoute, workbox requires that the regex match
// start at the first character in the URL string if it's a cross-origin (CORS) request.
workbox.routing.registerRoute(
  ({ url }) => {
    return url.href.toLowerCase().indexOf('/sitecore/api/layout') !== -1;
  },
  layoutServiceStrategy,
  'GET'
);

workbox.routing.registerRoute(
  ({ url }) => {
    return url.href.toLowerCase().indexOf('/-/jssmedia') !== -1;
  },
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'sitecore-media',
  }),
  'GET'
);
