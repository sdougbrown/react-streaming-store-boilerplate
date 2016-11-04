var webpack = require('webpack');
var getConfig = require('hjs-webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var env = process.env.NODE_ENV || 'development';
var isDev = env === 'development';

console.log('🤖  Build Environment: ', env);

var config = getConfig({
  // entry point for the app
  port: 3030,
  in: './client/app',
  out: 'public',
  isDev: isDev,
  devServer: {
    inline: true
  },
  html: (data) => {
    return {
      'index.html': data.defaultTemplate({
        title: `React Streaming BoilerPlate - ${env}`
      })
    }
  }
});

// for svg icons
config.module.loaders.push({
  test: /\.svg$/,
  loader: 'svg-sprite!svgo?' + JSON.stringify({
    name: '[name]_[hash]',
    prefixize: true
  })
});

if (isDev) {
  config.devtool = 'source-map';
  config.entry.unshift('webpack-hot-middleware/client');

  // init preLoaders
  config.module.preLoaders = config.module.preLoaders || [];

  config.module.preLoaders.push({
    test: /(\.js|\.jsx)$/,
    exclude: /node_modules/,
    loader: 'eslint'
  });
}

config.plugins.push(
  // reduces size of lodash package
  new LodashModuleReplacementPlugin({
    'collections': true,
    'paths': true
  }),
  // sets environment for client config
  // (e.g. environment badges, route prefix)
  new webpack.DefinePlugin({
    'process.env': { BUILD_ENV: JSON.stringify(env) }
  }),
  // fetch polyfill
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
);

module.exports = config;
