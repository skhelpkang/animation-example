
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const rimraf = require('rimraf');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildCommon = require('./webpack.common.builder.js');

const constant = {
  WORK_DIR: 'app',
  OUTPUT_PATH: path.join(process.cwd(), 'build'),
};


function build({ entry, additionalExternals }, {}) {
  //
  rimraf.sync(constant.OUTPUT_PATH);

  const config = {
    output: {
      path: constant.OUTPUT_PATH,
      publicPath: '',
      filename: '[name].[hash].js',
      libraryTarget: 'window',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // NODE_ENV: JSON.stringify('production'),
          NODE_ENV: JSON.stringify('development'),
        }
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false
        },
        drop_console: true,
        mangle: {
          keep_fnames: true,
          except: ['$super']
        }
      }),
      new CopyWebpackPlugin([{
        from: 'resource',
        to: '',
        context: path.join(process.cwd()),
      }]),
    ],
  };


  return webpackMerge(buildCommon({ entry, additionalExternals }), config);
}

module.exports = build;
