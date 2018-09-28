const ngrok = require('ngrok');
const jssconfig = require('../scjssconfig.json');
const packageConfig = require('../package.json');

startSitecoreTunnel(jssconfig.sitecore.layoutServiceHost);

function startSitecoreTunnel(sitecoreHost, port = 80) {
  if (!sitecoreHost) {
    throw new Error(
      'Unable to start Sitecore tunnel as no host name for the Sitecore instance was specified.'
    );
  }

  const protocol = getProtocol(sitecoreHost);
  if (!protocol) {
    console.warn(
      `No protocol found on host: ${sitecoreHost}. The tunnel will use 'http' by default.`
    );
  }

  // be sure to strip the scheme/protocol from the host url, otherwise ngrok will make requests like 'http://http://jssbasicapp'.
  const hostWithoutProtocol = sitecoreHost.replace(`${protocol}://`, '');
  const rewriteHost = `${hostWithoutProtocol}:${port}`;

  return ngrok
    .connect({
      proto: 'http',
      host_header: 'rewrite',
      addr: rewriteHost,
      subdomain: packageConfig.config.appName, // note: custom subdomain only available with paid ngrok plan
    })
    .then((url) => {
      console.log('tunnel started', url);
      return url;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getProtocol(host) {
  const finalHost = host.toLowerCase();
  if (finalHost.indexOf('http://') === 0) {
    return 'http';
  }
  if (finalHost.indexOf('https://') === 0) {
    return 'https';
  }
  return 'http';
}
