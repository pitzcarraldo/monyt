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

var _measured = require('measured');

var _measured2 = _interopRequireDefault(_measured);

var _MarkableMetrics2 = require('./MarkableMetrics');

var _MarkableMetrics3 = _interopRequireDefault(_MarkableMetrics2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestCountMetrics = function (_MarkableMetrics) {
  (0, _inherits3.default)(RequestCountMetrics, _MarkableMetrics);

  function RequestCountMetrics() {
    (0, _classCallCheck3.default)(this, RequestCountMetrics);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RequestCountMetrics).call(this, new _measured2.default.Meter()));

    _this.name = 'requestCount';
    return _this;
  }

  (0, _createClass3.default)(RequestCountMetrics, [{
    key: 'getValue',
    value: function getValue() {
      return this.marker.toJSON().count;
    }
  }]);
  return RequestCountMetrics;
}(_MarkableMetrics3.default);

exports.default = RequestCountMetrics;
//# sourceMappingURL=RequestCountMetrics.js.map