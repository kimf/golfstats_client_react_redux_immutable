const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// eslint-disable-next-line no-process-env
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const sourcePath = path.join(__dirname, './src')
const staticsPath = path.join(__dirname, './dist')

const extractCSS = new ExtractTextPlugin({
  allChunks: true,
  disable: false,
  filename: 'style.css'
})

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    filename: 'vendor.bundle.js',
    minChunks: Infinity,
    name: 'vendor'
  }),
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(nodeEnv) } }),
  new HtmlWebpackPlugin({
    inject: true,
    production: isProd,
    template: `${sourcePath}/index.html`
  }),
  new CopyWebpackPlugin([{ from: `${sourcePath}/public`, to: staticsPath }])
]

const jsEntry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3000',
  'index'
]

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false
      },
      output: { comments: false }
    }),
    extractCSS
  )

  jsEntry.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  context: sourcePath,
  entry: {
    js: jsEntry,
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: staticsPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: isProd
          ? extractCSS.extract({
            fallbackLoader: 'style-loader',
            loader: ['css-loader', 'sass-loader']
          })
          : ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: { cacheDirectory: true }
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  plugins,
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    port: 3000,
    hot: true,
    compress: isProd,
    stats: { colors: true }
  }
}
