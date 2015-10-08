import webpack from 'webpack';
import config from '../../config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const paths = config.get('utils_paths');

const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : 'source-map',
  entry   : {
    app : [
      paths.project(config.get('dir_src'))
    ],
    vendor : config.get('vendor_dependencies')
  },
  output : {
    filename   : '[name].[hash].js',
    path       : paths.project(config.get('dir_dist')),
    publicPath : '/'
  },
  plugins : [
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template : paths.src('index.html'),
      hash     : true,
      filename : 'index.html',
      minify   : {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true
      },
      inject   : 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash].js')
  ],
  resolve : {
    extensions : ['', '.js', '.jsx'],
    alias      : config.get('utils_aliases')
  },
  module : {
    preLoaders : [
      {
        test : /\.(js|jsx)$/,
        loaders : ['eslint-loader'],
        exclude : /node_modules/
      }
    ],
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude : /node_modules/,
        loader  : 'babel',
        query   : {
          stage    : 0,
          optional : ['runtime'],
          env      : {
            development : {
              plugins : ['react-transform'],
              extra   : {
                'react-transform' : {
                  transforms : [{
                    transform : 'react-transform-catch-errors',
                    imports   : ['react', 'redbox-react']
                  }]
                }
              }
            }
          }
        }
      },
      {
        test    : /\.scss$/,
        loaders : [
          'style-loader',
          'css-loader',
          'sass-loader?includePaths[]=' + paths.src('styles')
        ]
      },
      {
        test    : /\.styl$/,
        loaders : [
          'stylus-loader',
          'css-loader',
          'style-loader'
        ]
      }
    ]
  },
  eslint : {
    configFile : paths.project('.eslintrc')
  }
};

export default webpackConfig;
