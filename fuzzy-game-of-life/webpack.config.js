const { DefinePlugin } = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')

module.exports = {
  entry: './src/main.js',

  output: {
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: '.',
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'inferno',
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new BabiliPlugin(),
  ],
}

// vim: set ts=2 sw=2 et:
