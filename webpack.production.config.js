var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //行到行的source map
  devtool: 'cheap-module-source-map',
  entry: ['./src/index'],
  output: {
  path: path.join(__dirname, 'dist/zhihuDaily/public'),
  filename: 'bundle.js',
  },
  resolve: {
    // 如果不加上jsx默认不会处理jsx文件
    // 这样的话无法import jsx文件
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
  new ExtractTextPlugin('style.css', { allChunks: false }),
  new HtmlWebpackPlugin({ template: './src/index.html', inject: 'body' }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
    warnings: false
    }
  })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      //'react-hot'放在最前面，然后处理jsx，最后babel预编译
      loaders: ['react-hot', 'jsx?harmony', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.styl$/,
      //'style-loader!css-loader!stylus-loader'
      loader: ExtractTextPlugin.extract('style-loader!', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader')
    },
    {
      test:/.png$/,
      loader: 'url-loader?limit=8192&name=images/[name].[ext]'
    }]
  }
};
