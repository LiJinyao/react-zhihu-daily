'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _imgTransmitter = require('../zhihuDailyTransmit/imgTransmitter');

var _imgTransmitter2 = _interopRequireDefault(_imgTransmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

// send all request to zhihuDaily server.
router.get('*', function (req, res) {
  (0, _imgTransmitter2.default)(req.query.url, res).then(function (data) {
    res.end();
  }).catch(function (err) {
    res.send(err);
  });
});
exports.default = router;
//# sourceMappingURL=img.js.map
