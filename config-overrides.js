const { getLoader, loaderNameMatches } = require('react-app-rewired');
const { rewireWorkboxInject, defaultInjectConfig } = require('react-app-rewire-workbox');
const rewireStyledComponents = require('react-app-rewire-styled-components');
// eslint-disable-next-line import/no-extraneous-dependencies
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');

module.exports = {
  // The webpack config to use when compiling your react app for development or production.
  webpack: (config, env) => {
    // if (env === "production") {
    console.log('Production build - Adding Workbox for PWAs');
    const workboxConfig = { ...defaultInjectConfig, swSrc: './public/service-worker.js' };
    const rewireWorkboxConfig = rewireWorkboxInject(workboxConfig)(config, env);

    const rewireStyledComponentsConfig = rewireStyledComponents(rewireWorkboxConfig, env, {
      ssr: true,
    });

    const finalConfig = { ...rewireStyledComponentsConfig };
    const urlLoader = getLoader(finalConfig.module.rules, (rule) =>
      loaderNameMatches(rule, 'url-loader')
    );
    urlLoader.options.limit = 1000;

    // This fixes an issue with .mjs imports.
    // Specifically, with the `2.0.0-next.3e165448` version of react-scripts, along with webpack 4 and
    // modules distributed as `.mjs`, you may encounter this error (or similar) during webpack build:
    // `Can't import the named export 'XXXX' from non ecmascript module (only default export is available)`
    // The workaround is to handle `.mjs` files differently than the out of the box webpack config from CRA.
    // This thread has more info: https://github.com/apollographql/react-apollo/issues/1737
    // While that thread is specific to `react-apollo`, the error in this project was originating from `rebass`.
    // NOTE: this is a very brittle workaround and should be re-evaluated after any dependency upgrades
    // for `react-scripts` or `rebass`.
    // finalConfig.module.rules.splice(2, 0, {
    //   test: /\.mjs$/,
    //   include: /node_modules/,
    //   type: 'javascript/auto',
    // });

    // console.log('rewireConfig', JSON.stringify(finalConfig, null, 2));
    return finalConfig;
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: (config) => config,
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: (configFunction) => {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return (proxy, allowedHost) => {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // CRA uses a `noopServiceWorkerMiddleware` for webpack devServer.
      // It does this by calling `app.use(noopServiceWorkerMiddleware());` within
      // the devServer.before() function.
      // We workaround this by providing our own `before()` function, but need to
      // retain the other behavior of the default `before()` function.
      // Obviously this is very brittle...
      config.before = (app) => {
        // This lets us open files from the runtime error overlay.
        app.use(errorOverlayMiddleware());
      };

      config.quiet = false;
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
