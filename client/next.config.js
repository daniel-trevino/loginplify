// next.config.js
// Reference: https://github.com/zeit/now-builders/blob/master/errors/now-next-legacy-mode.md
const webpack = require('webpack')
const withTypescript = require('@zeit/next-typescript')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = withTypescript({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  target: 'serverless',
  webpack(config) {
    if (isDevelopment) {
      // if deploying with now-ci env values are taken not from .env but from now.json
      // https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/
      // now deployment breaks if dotenv used
      const { parsed: localEnv } = require('dotenv').config()
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    }

    return config
  },
  env: {
    ENDPOINT: isDevelopment
      ? 'https://moneytrack-gateway-24yqcvk7o.now.sh/graphql'
      : process.env.ENDPOINT
  }
})
