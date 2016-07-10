var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  //启用热替换
  hot: true,
  historyApiFallback: true,
  //设置服务器的根目录
  contentBase: "./src"
}).listen(1234, 'localhost', (err, result) => {
  if(err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:1234/');
});
