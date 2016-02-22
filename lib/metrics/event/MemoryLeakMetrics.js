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

var _memwatchNext = require('memwatch-next');

var _memwatchNext2 = _interopRequireDefault(_memwatchNext);

var _heapdump = require('heapdump');

var _heapdump2 = _interopRequireDefault(_heapdump);

var _Metrics2 = require('../Metrics');

var _Metrics3 = _interopRequireDefault(_Metrics2);

var _warning = require('../../warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MemoryLeakMetrics = function (_Metrics) {
  (0, _inherits3.default)(MemoryLeakMetrics, _Metrics);

  function MemoryLeakMetrics() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, MemoryLeakMetrics);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MemoryLeakMetrics).call(this));

    _this.name = 'memoryLeak';
    _this.value = {};
    _this.autoDump = options.autoDump || false;
    _this.listen();
    return _this;
  }

  (0, _createClass3.default)(MemoryLeakMetrics, [{
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      _memwatchNext2.default.on('leak', function (stats) {
        (0, _warning2.default)('Detected Memory Leaks ' + stats);
        _this2.value = stats;
        if (_this2.autoDump) {
          _heapdump2.default.writeSnapshot(function (err, filename) {
            if (err) {
              (0, _warning2.default)('Heap Dump Failed ' + err);
              return;
            }
            (0, _warning2.default)('Heap Dump Written To ' + filename);
          });
        }
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var value = (0, _extends3.default)({}, this.value);
      this.value = {};
      return value;
    }
  }]);
  return MemoryLeakMetrics;
}(_Metrics3.default);

exports.default = MemoryLeakMetrics;
//# sourceMappingURL=MemoryLeakMetrics.js.map