const path = require('path');
const fs = require('fs');
const { deploy } = require('@sitecore-jss/sitecore-jss-dev-tools');
const jssConfig = require('../scjssconfig.json');
const packageConfig = require('../package.json');

// If a service worker file lives in a sub-directory, e.g. /dist/sym-pwa
// Then it will by default be scoped to that sub-directory. You can't scope to a parent directory.
// Therefore, for a service-worker to handle all URLs in a site, it must live in the root directory.
// When deploying a JSS app to Sitecore, this becomes problematic.
// Therefore, when deploying to Sitecore, we copy the service worker file to the root directory.
// Everything else goes to the `sitecoreDistPath`, e.g. /dist/sym-pwa.
// Also see `registerServiceWorker.js` for a little dance we have to do there.

const serviceWorkerFileName = `${packageConfig.config.appName}-service-worker.js`;

deployAppFiles();
deployServiceWorker();

function deployAppFiles() {
  console.log('deploying app files');
  const deployOptions = {
    sourcePath: path.resolve('./build'),
    destinationPath: path.join(
      jssConfig.sitecore.instancePath,
      packageConfig.config.sitecoreDistPath
    ),
    excludeFile: serviceWorkerFileName,
  };

  deploy(deployOptions);
}

function deployServiceWorker() {
  console.log('deploying service worker');
  const deployOptions = {
    sourcePath: path.resolve(`./build/${serviceWorkerFileName}`),
    destinationPath: path.join(jssConfig.sitecore.instancePath, serviceWorkerFileName),
  };

  // Trying to use JSS deploy for a single file results in the destinationPath being created as a folder.
  // Setting destinationPath to a folder with sourcePath as a file results in Error: EPERM: operation not permitted, unlink
  // deploy(deployOptions);
  console.log(`Copying ${deployOptions.sourcePath} to ${deployOptions.destinationPath}`);
  fs.copyFileSync(deployOptions.sourcePath, deployOptions.destinationPath);
}
