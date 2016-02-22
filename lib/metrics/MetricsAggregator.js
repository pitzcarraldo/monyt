'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MetricsAggregator = function () {
  /**
   * @param {Object} [options={}] - Options to initialize MetricsAggregator.
   * @param {string} [options.prefix=''] - Prefix of metrics name.
   * @param {Array} [options.metricses=[]] - Metricses to aggregate.
   * @param {number} [options.interval=30000] - Interval to aggregate.
   * @returns {MetricsAggregator} - new MetricsAggregator Instance.
   */

  function MetricsAggregator() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, MetricsAggregator);

    this.prefix = options.prefix || '';
    this.metricses = options.metricses || [];
    this.interval = options.interval || _constants.DEFAULT_INTERVAL;
    this.listener = '';
  }

  (0, _createClass3.default)(MetricsAggregator, [{
    key: 'aggregate',
    value: function aggregate() {
      var _this = this;

      return this.metricses.reduce(function (metricses, metrics) {
        metricses[_this.prefix + metrics.getName()] = metrics.getValue();
        return metricses;
      }, {});
    }
  }, {
    key: 'listen',
    value: function listen(callback) {
      var _this2 = this;

      this.listener = setInterval(function () {
        callback && callback(_this2.aggregate());
      }, this.interval);
      return this.listener;
    }
  }, {
    key: 'stop',
    value: function stop() {
      return clearInterval(this.listener);
    }
  }, {
    key: 'markMiddleware',
    value: function markMiddleware() {
      var requestMarker = this.metricses.find(function (metrics) {
        return metrics.name === 'requestCount';
      });
      var errorMarker = this.metricses.find(function (metrics) {
        return metrics.name === 'errorCount';
      });
      return function (req, res, next) {
        requestMarker && requestMarker.mark && requestMarker.mark();
        if (res.statusCode >= 400) {
          errorMarker && errorMarker.mark && errorMarker.mark();
        }
        next();
      };
    }
  }]);
  return MetricsAggregator;
}();

exports.default = MetricsAggregator;
//# sourceMappingURL=MetricsAggregator.js.map