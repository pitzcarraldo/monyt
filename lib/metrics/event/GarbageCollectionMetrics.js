'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _gcStats = require('gc-stats');

var _gcStats2 = _interopRequireDefault(_gcStats);

var _Metrics2 = require('../Metrics');

var _Metrics3 = _interopRequireDefault(_Metrics2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GarbageCollectionMetrics = function (_Metrics) {
  (0, _inherits3.default)(GarbageCollectionMetrics, _Metrics);

  function GarbageCollectionMetrics() {
    (0, _classCallCheck3.default)(this, GarbageCollectionMetrics);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GarbageCollectionMetrics).call(this));

    _this.gc = (0, _gcStats2.default)();
    _this.name = 'gc';
    _this.value = {};
    _this.listen();
    return _this;
  }

  (0, _createClass3.default)(GarbageCollectionMetrics, [{
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      this.gc.on('stats', function (stats) {
        _this2.value = _this2.toMetrics(stats);
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var value = (0, _extends3.default)({}, this.value);
      this.value = {};
      return value;
    }
  }, {
    key: 'toMetrics',
    value: function toMetrics(stats) {
      var metrics = {};
      var gcType = this.getGCType(stats.gctype);
      metrics[gcType] = stats.pauseMS;
      return metrics;
    }
  }, {
    key: 'getGCType',
    value: function getGCType(type) {
      switch (type) {
        case 1:
          return 'minor';
        case 2:
        case 3:
          return 'major';
        default:
          return '';
      }
    }
  }]);
  return GarbageCollectionMetrics;
}(_Metrics3.default);

exports.default = GarbageCollectionMetrics;
//# sourceMappingURL=GarbageCollectionMetrics.js.map