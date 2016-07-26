'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apiTransmitter = require('../zhihuDailyTransmit/apiTransmitter');

var _apiTransmitter2 = _interopRequireDefault(_apiTransmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

// send all request to zhihuDaily server.
router.get('*', function (req, res) {
  (0, _apiTransmitter2.default)(req.path).then(function (data) {
    res.send(JSON.parse(data));
  }).catch(function (err) {
    res.send(err);
  });
});
exports.default = router;
//# sourceMappingURL=api.js.map
