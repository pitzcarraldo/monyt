'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sender = function Sender() {
  (0, _classCallCheck3.default)(this, Sender);

  if (!this.send) {
    throw new Error('Not implemented: send()');
  }
};

exports.default = Sender;
//# sourceMappingURL=Sender.js.map