'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger =
/**
 * @param {Object} options - Options to construct Logger instance.
 * @param {Object} options.logger - Core logger to initialize Logger.
 * @param {Function} options.logger.trace - log method for trace level.
 * @param {Function} options.logger.debug - log method for debug level.
 * @param {Function} options.logger.info - log method for info level.
 * @param {Function} options.logger.warn - log method for warn level.
 * @param {Function} options.logger.error - log method for error level.
 * @param {Function} options.logger.fatal - log method for fatal level.
 * @returns {Logger} - new Logger Instance.
 */
function Logger() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  (0, _classCallCheck3.default)(this, Logger);
  var logger = options.logger;

  if (!logger) {
    throw new Error('Initialize Error. logger is empty.');
  }
  ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].reduce(function (self, level) {
    if (!logger[level]) {
      throw new Error('Not Implemented : logger.' + level + '()');
    }
    self[level] = function () {
      return logger[level].apply(logger, arguments);
    };
    return self;
  }, this);
};

exports.default = Logger;
//# sourceMappingURL=Logger.js.map