'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _zhihu = require('./routes/zhihu');

var _zhihu2 = _interopRequireDefault(_zhihu);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _express2.default();

app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));
app.use((0, _morgan2.default)('dev'));

// 统一使用zhihu做代理
app.use('/zhihu', _zhihu2.default);
// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public', 'index.html'));
});
app.listen(8001);
//# sourceMappingURL=app.js.map
