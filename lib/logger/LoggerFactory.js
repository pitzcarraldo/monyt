'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Log4jsLogger = require('./Log4jsLogger');

var _Log4jsLogger2 = _interopRequireDefault(_Log4jsLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoggerFactory = function () {
  function LoggerFactory() {
    (0, _classCallCheck3.default)(this, LoggerFactory);
  }

  (0, _createClass3.default)(LoggerFactory, null, [{
    key: 'setFactory',
    value: function setFactory(cLogger) {
      LoggerFactory.FACTORY = cLogger;
      return LoggerFactory.FACTORY;
    }
  }, {
    key: 'getLogger',
    value: function getLogger(options) {
      return LoggerFactory.FACTORY.getLogger(options);
    }
  }, {
    key: 'logMiddleware',
    value: function logMiddleware(options) {
      return LoggerFactory.FACTORY.logMiddleware(options);
    }
  }]);
  return LoggerFactory;
}();

LoggerFactory.FACTORY = _Log4jsLogger2.default;
exports.default = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map