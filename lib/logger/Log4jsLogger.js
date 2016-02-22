'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _Logger2 = require('./Logger');

var _Logger3 = _interopRequireDefault(_Logger2);

var _index = require('./appenders/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log4jsLogger = function (_Logger) {
  (0, _inherits3.default)(Log4jsLogger, _Logger);
  (0, _createClass3.default)(Log4jsLogger, null, [{
    key: 'initCore',
    value: function initCore() {
      _log4js2.default.configure({ appenders: _index.DEFAULT_APPENDERS });
      return _log4js2.default;
    }
  }, {
    key: 'getCoreLogger',
    value: function getCoreLogger(options) {
      var category = options.category || 'app';
      var level = options.level || 'info';
      var replaceConsole = options.replaceConsole || false;
      var logger = Log4jsLogger.CORE.getLogger(category);
      logger.setLevel(level);
      replaceConsole && Log4jsLogger.CORE.replaceConsole(logger);
      return logger;
    }
  }, {
    key: 'addAppender',
    value: function addAppender(appender) {
      Log4jsLogger.CORE.addAppender(appender);
    }
  }, {
    key: 'replaceAppender',
    value: function replaceAppender() {
      for (var _len = arguments.length, appenders = Array(_len), _key = 0; _key < _len; _key++) {
        appenders[_key] = arguments[_key];
      }

      Log4jsLogger.CORE.configure({ appenders: [].concat(appenders) });
    }

    /**
     * @param {Object} [options={}] - Options to setup logMiddleware().
     * @param {string} [options.category=request] - Category name of request logger.
     * @param {string} [options.category=auto] - Level to log.
     * @param {string} [options.format=:method :url :status :content-length - :response-time ms] - Log format of request logger.
     * @returns {Function} connect/express middleware to logging requests.
     */

  }, {
    key: 'logMiddleware',
    value: function logMiddleware() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var logger = Log4jsLogger.CORE.getLogger(options.category || 'request');
      var level = options.level || 'auto';
      var format = options.format || ':method :url :status :content-length - :response-time ms';
      return Log4jsLogger.CORE.connectLogger(logger, { level: level, format: format });
    }

    /**
     * @param {Object} [options={category: 'app', level: 'info', replaceConsole: false}] - Options to initialize logger instance.
     * @param {string} [options.category=app] - Category of logger.
     * @param {string} [options.level=info] - Level to log.
     * @param {boolean} [options.replaceConsole=false] - Flag to switch replaceConsole options.
     * @returns {Log4jsLogger} - new Log4jsLogger Instance.
     */

  }, {
    key: 'getLogger',
    value: function getLogger(options) {
      return new Log4jsLogger(options);
    }

    /**
     * @param {Object} [options={}] - Options to initialize logger instance.
     * @param {string} [options.category=app] - Category of logger.
     * @param {string} [options.level=info] - Level to log.
     * @param {boolean} [options.replaceConsole=false] - Flag to switch replaceConsole options.
     * @returns {Log4jsLogger} - new Log4jsLogger Instance.
     */

  }]);

  function Log4jsLogger() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Log4jsLogger);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Log4jsLogger).call(this, { logger: Log4jsLogger.getCoreLogger(options) }));
  }

  return Log4jsLogger;
}(_Logger3.default);

Log4jsLogger.CORE = Log4jsLogger.initCore();
exports.default = Log4jsLogger;
//# sourceMappingURL=Log4jsLogger.js.map