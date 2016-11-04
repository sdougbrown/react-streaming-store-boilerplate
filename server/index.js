const express = require('express');

const app = module.exports = express();
const env = require('./environment');
const mode = process.env.NODE_ENV || env.DEVELOPMENT; // eslint-disable-line

// webpack is only needed in development
if (mode === env.DEVELOPMENT) {
  /* eslint-disable no-console */
  console.log('✌️  Development mode.');
  /* eslint-enable no-console */

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config');
  const compiler = webpack(config);
  // only need in development
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
}

// use the same routes that the client would be looking for
require('./routes')(app, mode);

app.start = () => {
  return app.listen(env.port, () => {
    console.log('👀  Server Listening on port %s', env.port);
  });
});

// start the server if `$ node server/`
if (require.main === module) {
  app.start();
}
