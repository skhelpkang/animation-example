
const buildDev = require('./webpack.dev.builder.js');
const healthProxy = 'http://adv-healthsurvey.sk.kr.mybluemix.net';
const memberProxy = 'http://service-member.sk.kr.mybluemix.net';


const commonOptions = {
  entry: {
    // 'vendor': './app/vendor.js',
    'app': './app/index.js',
  },
  additionalExternals: {},
};

const devOptions = {
  proxy: {
    '/faq/v1/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/qna/v1/*': {
      target: 'http://localhost:18061',
      changeOrigin: true,
    },
    '/sample-node/*': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '/edge-auth-service/*': {
      target: 'http://edge-gateway-app.sk.kr.mybluemix.net/',
      changeOrigin: true,
    },
    '/target/v1/*': {
      target: 'http://healthactivity.sk.kr.mybluemix.net/',
      changeOrigin: true,
    },
    '/inbox/v1/*': {
      //target: 'http://localhost:18062',
      target: 'http://member.sk.kr.mybluemix.net/',

      changeOrigin: true,
    },
    '/notice/v1/*' : {
      target: 'http://localhost:8081',
      changeOrigin : true,
    },

    '/healthprofile/v1/*' : {
      target: 'http://service-healthprofile.sk.kr.mybluemix.net',
      changeOrigin : true,
    },

    '/health/check/v1/*' : {
      target: healthProxy,
      changeOrigin : true,
    },

    '/member/v1/*' : {
      target: memberProxy,
      changeOrigin : true,
    },

    '/friend/v1/*': {
      target: memberProxy,
      changeOrigin: true,
    },
  },
};

module.exports = buildDev(commonOptions, devOptions);
