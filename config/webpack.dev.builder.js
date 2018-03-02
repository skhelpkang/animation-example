
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const buildCommon = require('./webpack.common.builder.js');


const constant = {
  WORK_DIR: 'app',
};

function build({ entry, additionalExternals }, { proxy, externalResources }) {
  //
  const config = {

    devtool: '#cheap-module-eval-source-map',

    output: {
      path: path.join(process.cwd(), './dist'),
      filename: '[name].[hash].js'
    },

    module: {
      loaders: [
        {
          test: /index\.html$/,
          loaders: ['raw-loader', StringReplacePlugin.replace({
            replacements: [
              {
                // Search like ${commonAssetLocation} that replace to http://nara.namoo.io/common-asset
                pattern: /\*\{\S+\}/g,
                replacement(match) {
                  const resourcePath = match.substring(2, match.length - 1);
                  return externalResources[resourcePath];
                },
              },
              {
                // Search like th:src=, th:href=, that replace to src=, href= (remove thymeleaf tag)
                pattern: /\sth:\S+=/g,
                replacement(match) {
                  return ' ' + match.substring(4, match.length);
                },
              },
              {
                // Search like +'/vendor.js' that replace to vendor.js
                pattern: /\+'\S+'/g,
                replacement(match) {
                  return match.substring(2, match.length - 1);
                },
              },
            ],
          })],
        }
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([{
        from: 'resource',
        to: '',
        context: path.join(process.cwd()),
      }]),
      new StringReplacePlugin(),
    ],

    devServer: {
      historyApiFallback: true,
      stats: 'minimal',
      inline: true,
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    }
  };


  if (proxy && typeof proxy === 'object') {
    config.devServer.proxy = proxy;
  }

  return webpackMerge(buildCommon({ entry, additionalExternals }), config);
}

module.exports = build;
