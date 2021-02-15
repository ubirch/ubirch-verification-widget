const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = function (env) {
  const STAGE = env.STAGE || 'dev';
  const MODE = STAGE === 'prod' || STAGE === 'demo' ? 'production' : 'development';

  return {
    mode: MODE,
    entry: {
      verification: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.ts'],
      fallback: {
        "js-sha256": require.resolve("js-sha256"),
        "js-sha512": require.resolve("js-sha512")
      }
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9102
    },
    plugins: [
      new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/verification.html'
      }),
      new CopyPlugin({
        patterns: [
          {
            from:'blockchain-assets/blockchain-settings.json',
            to:'blockchain-assets'
          },
        ],
      }),
      new webpack.NormalModuleReplacementPlugin(/(.*)environment.(\.*).ts/, function (resource) {
        resource.request = resource.request.replace(/environment.ts/, `environment.${STAGE}.ts`);
      })
    ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'blockchain-assets/blockchain-icons/[name].[ext]',
            }
          }]
        },
      ],
    },
  }
};

