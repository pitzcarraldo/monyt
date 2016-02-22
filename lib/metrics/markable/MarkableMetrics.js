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

var _Metrics2 = require('../Metrics');

var _Metrics3 = _interopRequireDefault(_Metrics2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkableMetrics = function (_Metrics) {
  (0, _inherits3.default)(MarkableMetrics, _Metrics);

  function MarkableMetrics(marker) {
    (0, _classCallCheck3.default)(this, MarkableMetrics);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MarkableMetrics).call(this));

    if (!marker) {
      throw new Error('marker is empty. Please check your constructor.');
    }
    if (!marker.mark) {
      throw new Error('Not Implemented: marker.mark()');
    }
    _this.marker = marker;
    return _this;
  }

  (0, _createClass3.default)(MarkableMetrics, [{
    key: 'mark',
    value: function mark() {
      this.marker.mark();
    }
  }]);
  return MarkableMetrics;
}(_Metrics3.default);

exports.default = MarkableMetrics;
//# sourceMappingURL=MarkableMetrics.js.map