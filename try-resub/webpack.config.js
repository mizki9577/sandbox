const HtmlWebpackPlugin = require('html-webpack-plugin')

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
            presets: [
              'react',
              'stage-0',
            ],
            plugins: [
              'transform-decorators-legacy',
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],
}

// vim: set ts=2 sw=2 et:
