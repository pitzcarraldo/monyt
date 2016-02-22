'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _constants = require('../../constants');

var _eventLoopLag = require('event-loop-lag');

var _eventLoopLag2 = _interopRequireDefault(_eventLoopLag);

var _Metrics2 = require('../Metrics');

var _Metrics3 = _interopRequireDefault(_Metrics2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventLoopLagMetrics = function (_Metrics) {
  (0, _inherits3.default)(EventLoopLagMetrics, _Metrics);

  function EventLoopLagMetrics() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, EventLoopLagMetrics);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EventLoopLagMetrics).call(this));

    _this.name = 'eventLoopLag';
    _this.interval = options.interval || _constants.DEFAULT_INTERVAL;
    _this.lag = (0, _eventLoopLag2.default)(_this.interval);
    return _this;
  }

  (0, _createClass3.default)(EventLoopLagMetrics, [{
    key: 'getValue',
    value: function getValue() {
      return this.lag();
    }
  }]);
  return EventLoopLagMetrics;
}(_Metrics3.default);

exports.default = EventLoopLagMetrics;
//# sourceMappingURL=EventLoopLagMetrics.js.map