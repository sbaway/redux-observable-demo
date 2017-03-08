var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin

var webpackStatsPath = path.resolve(__dirname, '../src/server/webpack-stats.json')
var HOST = process.env.HOST || 'localhost'
var WEBPACK_PORT = 8022

var babelrc = fs.readFileSync('./.babelrc')
var babelrcObject = JSON.parse(babelrc)
var config = {
  devtool: 'eval-source-map', // debug error in specific component
  entry: {
    index: [
      'webpack-hot-middleware/client?path=http://' + HOST + ':' + WEBPACK_PORT + '/__webpack_hmr',
      'webpack/hot/only-dev-server',
      './src/client/index.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://' + HOST + ':' + WEBPACK_PORT + '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js?$/,
    //     exclude: /(node_modules)|(Report)/,
    //     loader: 'eslint',
    //   },
    // ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)|(Reporter)/,
        loaders: ['react-hot', 'babel?' + JSON.stringify(babelrcObject)],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./fonts/[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=./img/[hash].[ext]',
      },
    ],
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['iOS > 6', 'Android >= 4'] })]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js'],
  },
  eslint: {
    configFile: './.eslintrc',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/client/template/index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEVTOOLS__: true,
      __LOGGER__: false,
      __DEVELOPMENT__: true,
    }),
    new StatsWriterPlugin({
      fields: ['assetsByChunkName'],
      filename: 'webpack-stats.json',
      transform: function (data, opts) {
        fs.writeFileSync(webpackStatsPath, JSON.stringify(data.assetsByChunkName.index))
        return JSON.stringify(data.assetsByChunkName)
      },
    }),
  ],
}
module.exports = config
