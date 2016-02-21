export default class Logger {
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
  constructor(options = {}) {
    const { logger } = options;
    if (!logger) {
      throw new Error('Initialize Error. logger is empty.');
    }
    [ 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ].reduce((self, level) => {
      if (!logger[level]) {
        throw new Error(`Not Implemented : logger.${level}()`);
      }
      self[level] = (...logs) => logger[level](...logs);
      return self;
    }, this);
  }
}
