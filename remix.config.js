/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: 'netlify',
  server: './server.js',
  ignoredRouteFiles: ['**/.*'],
  // assetsBuildDirectory: 'public/build',
  // publicPath: '/build/',
  // serverBuildTarget: 'netlify',
  // serverBuildPath: "build/index.js",
  // devServerPort: 8002
};
