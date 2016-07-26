'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get() {
  var route = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];

  return new _promise2.default(function (resolve, reject) {
    _http2.default.get('http://news-at.zhihu.com/api/4' + route, function (res) {
      // console.log(`Got response: ${res.statusCode}`);
      if (res.statusCode === 200) {
        (function () {
          res.setEncoding('utf8');
          var buf = '';
          res.on('data', function (chunk) {
            buf += chunk;
          });
          res.on('end', function () {
            return resolve(buf);
          });
        })();
      } else {
        reject(res.statusCode);
      }
      res.resume();
    }).on('error', function () {
      return reject(502);
    });
  });
} /**
   * Transmit api calls to Zhihu daily official site.
   */

exports.default = get;
//# sourceMappingURL=transmitter.js.map
