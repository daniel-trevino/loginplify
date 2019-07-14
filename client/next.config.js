// next.config.js
// Reference: https://github.com/zeit/now-builders/blob/master/errors/now-next-legacy-mode.md
const webpack = require('webpack')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  target: 'serverless',
  webpack(config) {
    return config
  }
}
