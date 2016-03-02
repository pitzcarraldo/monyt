import log4js from 'log4js';
import Logger from './Logger';
import { DEFAULT_APPENDERS } from './appenders/index';

export default class Log4jsLogger extends Logger {
  static CORE = Log4jsLogger.initCore();

  static initCore() {
    log4js.configure({ appenders: DEFAULT_APPENDERS });
    return log4js;
  }

  static getCoreLogger(options) {
    const category = options.category || 'app';
    const level = options.level || 'info';
    const replaceConsole = options.replaceConsole || false;
    const logger = Log4jsLogger.CORE.getLogger(category);
    logger.setLevel(level);
    replaceConsole && Log4jsLogger.CORE.replaceConsole(logger);
    return logger;
  }

  static addAppender({type, layout, config, category}) {
    Log4jsLogger.CORE.loadAppender(type);
    Log4jsLogger.CORE.addAppender(Log4jsLogger.CORE.appenders[type](layout, config), category);
  }

  static replaceAppender(...appenders) {
    Log4jsLogger.CORE.configure({ appenders: [ ...appenders ] });
  }

  /**
   * @param {Object} [options={}] - Options to setup logMiddleware().
   * @param {string} [options.category=request] - Category name of request logger.
   * @param {string} [options.category=auto] - Level to log.
   * @param {string} [options.format=:method :url :status :content-length - :response-time ms] - Log format of request logger.
   * @returns {Function} connect/express middleware to logging requests.
   */
  static logMiddleware(options = {}) {
    const logger = Log4jsLogger.CORE.getLogger(options.category|| 'request');
    const level = options.level || 'auto';
    const format = options.format || ':method :url :status :content-length - :response-time ms';
    return Log4jsLogger.CORE.connectLogger(logger, { level, format });
  }

  /**
   * @param {Object} [options={category: 'app', level: 'info', replaceConsole: false}] - Options to initialize logger instance.
   * @param {string} [options.category=app] - Category of logger.
   * @param {string} [options.level=info] - Level to log.
   * @param {boolean} [options.replaceConsole=false] - Flag to switch replaceConsole options.
   * @returns {Log4jsLogger} - new Log4jsLogger Instance.
   */
  static getLogger(options) {
    return new Log4jsLogger(options);
  }

  /**
   * @param {Object} [options={}] - Options to initialize logger instance.
   * @param {string} [options.category=app] - Category of logger.
   * @param {string} [options.level=info] - Level to log.
   * @param {boolean} [options.replaceConsole=false] - Flag to switch replaceConsole options.
   * @returns {Log4jsLogger} - new Log4jsLogger Instance.
   */
  constructor(options = {}) {
    super({ logger: Log4jsLogger.getCoreLogger(options) });
  }
}
