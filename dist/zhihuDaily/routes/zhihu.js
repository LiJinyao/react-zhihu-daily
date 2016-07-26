'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _zhihuTransmitter = require('../zhihuDailyTransmit/zhihuTransmitter');

var _zhihuTransmitter2 = _interopRequireDefault(_zhihuTransmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

// send all request to zhihuDaily server.
router.get('*', function (req, res) {
  // pass res to the transmitter.
  (0, _zhihuTransmitter2.default)(req.query.url, res).then(function () {
    return res.end();
  }).catch(function (err) {
    res.sendStatus(err);
  });
});
exports.default = router;
//# sourceMappingURL=zhihu.js.map
