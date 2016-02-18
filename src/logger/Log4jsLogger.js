import log4js from 'log4js';
import Logger from './Logger';
import {DEFAULT_APPENDERS} from './appenders/index';

export default class Log4jsLogger extends Logger {
  static FACTORY = (()=> {
    log4js.configure({appenders: DEFAULT_APPENDERS});
    return log4js;
  })();

  static addAppender(appender) {
    Log4jsLogger.FACTORY.addAppender(appender);
  }

  static replaceAppender(...appenders) {
    Log4jsLogger.FACTORY.configure({appenders: [...appenders]});
  }

  static getLogger(options) {
    return new Log4jsLogger(options);
  }

  /**
   * @param {Object} options - Options to setup logMiddleware().
   * @param {string} [options.category=request] - Category name of request logger.
   * @param {string} [options.category=auto] - Level to log.
   * @param {string} [options.format=:method :url :status :content-length - :response-time ms] - Log format of request logger.
   * @returns {*|Function} connect/express middleware to log.
   */
  static logMiddleware(options = {}) {
    const logger = new Log4jsLogger({category: options.category || 'request'});
    const level = options.level || 'auto';
    const format = options.format || ':method :url :status :content-length - :response-time ms';
    return Log4jsLogger.FACTORY.connectLogger(logger, {level, format});
  }

  /**
   * @param {Object} [options={category: 'app', level: 'info', replaceConsole: false}] - Options to initialize logger instance.
   * @param {string} [options.category=app] - Category of logger.
   * @param {string} [options.level=info] - Level to log.
   * @param {boolean} [options.replaceConsole=false] - Flag to switch replaceConsole options.
   */
  constructor(options = {category: 'app', level: 'info', replaceConsole: false}) {
    super({
      logger: ((options) => {
        const logger = Log4jsLogger.FACTORY.getLogger(options.category);
        if (options.replaceConsole) {
          Log4jsLogger.FACTORY.replaceConsole(logger);
        }
        logger.setLevel(options.level);
        return logger;
      })(options)
    });
  }
}
