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

var _graphite = require('graphite');

var _graphite2 = _interopRequireDefault(_graphite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GraphiteSender = function (_Sender) {
  (0, _inherits3.default)(GraphiteSender, _Sender);

  function GraphiteSender() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, GraphiteSender);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GraphiteSender).call(this));

    _this.client = _graphite2.default.createClient('plaintext://' + options.host + ':' + options.port + '/');
    return _this;
  }

  (0, _createClass3.default)(GraphiteSender, [{
    key: 'send',
    value: function send(metrics) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        _this2.client.write(metrics, function (error) {
          if (error) {
            return reject(error);
          }
          return resolve(metrics);
        });
      });
    }
  }]);
  return GraphiteSender;
}(_Sender3.default);

exports.default = GraphiteSender;
//# sourceMappingURL=GraphiteSender.js.map