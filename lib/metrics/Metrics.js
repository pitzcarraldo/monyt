"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Metrics = function () {
  function Metrics() {
    (0, _classCallCheck3.default)(this, Metrics);
  }

  (0, _createClass3.default)(Metrics, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }]);
  return Metrics;
}();

exports.default = Metrics;
//# sourceMappingURL=Metrics.js.map