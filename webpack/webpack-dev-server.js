var express = require('express')
var webpack = require('webpack')

var webpackConfig = require('./webpack.dev.config')
var compiler = webpack(webpackConfig)
var HOST = process.env.HOST || 'localhost'
var WEBPACK_PORT = 8022

var serverOptions = {
  contentBase: 'http://' + HOST + ':' + WEBPACK_PORT,
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
  },
  stats: { colors: true },
}

var app = new express()

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(WEBPACK_PORT, function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🚧 Webpack development server listening on port %s', WEBPACK_PORT)
  }
})
