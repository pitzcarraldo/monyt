'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _Sender2 = require('./Sender');

var _Sender3 = _interopRequireDefault(_Sender2);

var _warning = require('../warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessSender = function (_Sender) {
  (0, _inherits3.default)(ProcessSender, _Sender);

  function ProcessSender() {
    (0, _classCallCheck3.default)(this, ProcessSender);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProcessSender).call(this));

    _this.sendMessage = process.send;
    if (!_this.sendMessage) {
      (0, _warning2.default)('Process Sender only can work in clusters mode. This Process Sender will not send metricses.');
      _this.sendMessage = function () {};
    }
    return _this;
  }

  (0, _createClass3.default)(ProcessSender, [{
    key: 'send',
    value: function send(metrics) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        try {
          _this2.sendMessage(metrics);
          return resolve(metrics);
        } catch (error) {
          return reject(error);
        }
      });
    }
  }]);
  return ProcessSender;
}(_Sender3.default);

exports.default = ProcessSender;
//# sourceMappingURL=ProcessSender.js.map