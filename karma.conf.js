module.exports = (config) => {
  const path = require('path')
  const nodeForgePath = path.resolve(__dirname, 'node_modules/peer-id/deps/forge.bundle.js')

  config.set({
    basePath: '',
    frameworks: ['mocha'],

    files: [
      nodeForgePath,
      'tests/*-test.js'
    ],

    preprocessors: {
      'tests/*': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: ['', '.js', '.json']
      },
      externals: {
        fs: '{}',
        'node-forge': 'forge'
      },
      node: {
        Buffer: true
      },
      module: {
        loaders: [
          { test: /\.json$/, loader: 'json' }
        ],
        noParse: []
      }
    },

    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: process.env.TRAVIS ? ['Firefox'] : ['Chrome'],
    singleRun: true
  })
}

