const { DefinePlugin } = require('webpack')
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = env => {
  const module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
            ],
          },
        },
      },
    ],
  }

  const plugins = [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: `"${ env.production ? 'production' : 'development' }"`
      },
    }),
  ]
  if (env.production) {
    plugins.push(new BabelMinifyPlugin())
  }

  return {
    entry: './src/main.js',

    output: {
      filename: 'bundle.js',
    },

    devServer: {
      contentBase: '.',
    },

    devtool: 'inline-source-map',

    module, plugins,
  }
}

// vim: set ts=2 sw=2 et:
