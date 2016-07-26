'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 转发知乎的图片
 * @param imgUrl
 * @param ServerRes
 * @returns {Promise}
 */
function getImg() {
  var imgUrl = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var ServerRes = arguments[1];

  return new _promise2.default(function (resolve, reject) {
    _http2.default.get(imgUrl, function (res) {
      if (res.statusCode === 200) {
        ServerRes.status(200);
        res.on('data', function (chunk) {
          ServerRes.write(chunk);
        });
        res.on('end', function () {
          return resolve();
        });
      } else {
        reject(res.statusCode);
      }
    }).on('error', function () {
      return reject(502);
    });
  });
}

exports.default = getImg;
//# sourceMappingURL=imgTransmitter.js.map
