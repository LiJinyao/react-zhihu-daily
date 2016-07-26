'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zhihuHostName = new _set2.default(['zhihu.com', 'zhimg.com']);

// 检查是否是知乎的域名
function checkHostName(urlString) {
  var zhihuUrl = _url2.default.parse(urlString);
  // 比较顶级域名
  return zhihuHostName.has(zhihuUrl.hostname.replace(/.+?\./, ''));
}

/*
根据url的不同返回http或https的get方法。
 */
function getRequestMethod(urlString) {
  var zhihuUrl = _url2.default.parse(urlString);
  if (zhihuUrl.protocol === 'https:') {
    return _https2.default.get;
  }
  return _http2.default.get;
}

function zhihuApiTransmitter() {
  var zhihuUrl = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var serverRes = arguments[1];

  return new _promise2.default(function (resolve, reject) {
    if (checkHostName(zhihuUrl)) {
      // 有的链接是http协议，有的是https协议，不同的协议用不同的get方法。
      getRequestMethod(zhihuUrl)(zhihuUrl, function (res) {
        if (res.statusCode === 200) {
          serverRes.status(200);
          res.on('data', function (chunk) {
            serverRes.write(chunk);
          });
          res.on('end', function () {
            serverRes.end();
            resolve();
          });
        } else {
          reject(res.statusCode);
        }
      }).on('error', function () {
        return reject(502);
      });
    } else {
      serverRes.status(404).send('The request url is not belong to Zhihu.');
    }
  });
}

exports.default = zhihuApiTransmitter;
//# sourceMappingURL=zhihuTransmitter.js.map
