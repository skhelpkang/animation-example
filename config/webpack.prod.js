
const webpackMerge = require('webpack-merge');

const buildProd = require('./webpack.prod.builder.js');


const commonOptions = {
  entry: {
    // 'vendor': './app/vendor.js',
    'app': './app/index.js',
  },
  additionalExternals: {},
};

const prodOptions = {
};


module.exports = webpackMerge(buildProd(commonOptions, prodOptions));
