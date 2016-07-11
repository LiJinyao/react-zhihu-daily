var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  //启用热替换
  hot: true,
  historyApiFallback: false,
  //设置服务器的根目录
  contentBase: "./src",
  // 设置代理到api服务器
  proxy: {
    '/api/*': 'http://localhost:8080/'
  },
  stats: {
    colors: true,
    // Not output chunks info.
    chunks: false
  }
}).listen(1234, (err, result) => {
  if(err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:1234/');
});
