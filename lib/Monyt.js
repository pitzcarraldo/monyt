'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _constants = require('./constants');

var _LoggerFactory = require('./logger/LoggerFactory');

var _LoggerFactory2 = _interopRequireDefault(_LoggerFactory);

var _MetricsAggregator = require('./metrics/MetricsAggregator');

var _MetricsAggregator2 = _interopRequireDefault(_MetricsAggregator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Monyt = function () {
  /**
   * @param {Object} [options={}] - Options to initialize Monyt.
   * @param {string} [options.interval=30000] - Interval to listen aggregate.
   * @param {Array<Metrics>} [options.metricses=[]] - List of Metrics to aggregate.
   * @param {Array<Sender>} [options.senders=[]] - List of sender to send metricses.
   * @param {Promise} [options.listener=new Promise()] - Listener of MetricsAggregator.
   * @param {string} [options.prefix=''] - Prefix of metrics name.
   * @param {Object} [options.aggregator=new MetricsAggregator({...options, interval: this.interval})] - Instance of MetricsAggregator.
   * @param {Logger} [options.logger=LoggerFactory.FACTORY] - Logger Class to use.
   * @return {Monyt} - new Monyt Instances.
   */

  function Monyt() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Monyt);

    this.interval = options.interval || _constants.DEFAULT_INTERVAL;
    this.senders = options.senders || [];
    this.listener = '';
    this.aggregator = options.aggregator || new _MetricsAggregator2.default((0, _extends3.default)({}, options, { interval: this.interval }));
    options.logger && _LoggerFactory2.default.setFactory(options.logger);
  }

  /**
   * Start to aggregate and send metricses.
   * Replace Console to default logger when replaceConsole is true.
   * @param {Function} callback - callback function that returns result promises of senders.
   * @returns {Number} - interval listener id.
   */


  (0, _createClass3.default)(Monyt, [{
    key: 'listen',
    value: function listen(callback) {
      var _this = this;

      return this.aggregator.listen(function (metricses) {
        callback && callback(_promise2.default.all(_this.senders.map(function (sender) {
          return sender.send(metricses);
        })));
      });
    }

    /**
     * Stop to listen.
     * @returns {Number} - result of clearListener.
     */

  }, {
    key: 'stop',
    value: function stop() {
      return this.aggregator.stop();
    }

    /**
     * @returns {Logger} logger - Default logger instance.
     */

  }, {
    key: 'getLogger',
    value: function getLogger() {
      return _LoggerFactory2.default.getLogger();
    }

    /**
     * @returns {Array} middlewares - List of middlewares to mark and log requests and errors.
     */

  }, {
    key: 'middlewares',
    value: function middlewares() {
      return [this.aggregator.markMiddleware(), _LoggerFactory2.default.logMiddleware()];
    }
  }]);
  return Monyt;
}();

exports.default = Monyt;
//# sourceMappingURL=Monyt.js.map