var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  //行到行的source map
  devtool: 'eval',
  entry: [
    //hot loader的entry设置
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index' // Your appʼs entry point
  ],
  output: {
  path: path.join(__dirname, 'dist'),
  filename: 'bundle.js',
  //热加载时使用的编译输出的相对路径
  publicPath: '/'
  },
  resolve: {
    // 如果不加上jsx默认不会处理jsx文件
    // 这样的话无法import jsx文件
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
  //使用react热替换插件
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({ template: './src/index.html', inject: 'body' })
  //new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      //loader顺序是从后往前
      loaders: ['react-hot', 'jsx?harmony', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.styl$/,
      //'style-loader!css-loader!stylus-loader'
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader'
    },
    {
      test:/.png$/,
      loader: 'url-loader?limit=8192&name=images/[name].[ext]'
    }]
  }
};
