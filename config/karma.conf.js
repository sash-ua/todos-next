var webpackConfig = require('./webpack.test');

module.exports = function (config) {
    config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  });
    if (process.env.APPVEYOR) {
        config.browsers = ['IE'];
        config.singleRun = true;
        config.browserNoActivityTimeout = 100000; // Note: default value (10000) is not enough
    }
    
    if (process.env.TRAVIS || process.env.CIRCLECI) {
        config.browsers = ['Chrome_travis_ci'];
        config.singleRun = true;
        config.browserNoActivityTimeout = 100000;
    }
};
