const express = require('express');

const app = module.exports = express();
const env = require('./environment');
const mode = process.env.NODE_ENV || env.DEVELOPMENT; // eslint-disable-line

/* eslint-disable no-console */
const log = console.log.bind(console);
/* eslint-enable no-console */

// webpack is only needed in development
if (mode === env.DEVELOPMENT) {
  log('✌️  Development mode.');

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
require('./mockApi')(app);

app.start = () => {
  return app.listen(env.port, () => {
    log('👀  Server Listening on port %s', env.port);
  });
};

// start the server if `$ node server/`
if (require.main === module) {
  app.start();
}
