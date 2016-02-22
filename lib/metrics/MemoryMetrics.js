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

var _Metrics2 = require('./Metrics');

var _Metrics3 = _interopRequireDefault(_Metrics2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MemoryMetrics = function (_Metrics) {
  (0, _inherits3.default)(MemoryMetrics, _Metrics);

  function MemoryMetrics() {
    (0, _classCallCheck3.default)(this, MemoryMetrics);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MemoryMetrics).call(this));

    _this.name = 'memory';
    return _this;
  }

  (0, _createClass3.default)(MemoryMetrics, [{
    key: 'getValue',
    value: function getValue() {
      return process.memoryUsage();
    }
  }]);
  return MemoryMetrics;
}(_Metrics3.default);

exports.default = MemoryMetrics;
//# sourceMappingURL=MemoryMetrics.js.map