const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    port: 3000,
    proxy: {
      'https://reviewfier.herokuapp.com/**': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    }
 
  },
});
