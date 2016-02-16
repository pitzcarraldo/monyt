import log4js from 'log4js';
import appAppender from './appAppender';
import networkAppender from './networkAppender';

export default class Logger {
  static LOGGER_FACTORY = Logger.createLoggerFactory();

  static createLoggerFactory() {
    log4js.configure({
      appenders: [appAppender, networkAppender]
    });
    return log4js;
  }

  static getLogger(options = {}) {
    const logger = Logger.LOGGER_FACTORY.getLogger(options.category || 'app');
    logger.setLevel(options.level);
    if (options.replaceConsole) {
      Logger.LOGGER_FACTORY.replaceConsole(logger);
    }
    return logger;
  }

  static middleware(options = {}) {
    const logger = Logger.LOGGER_FACTORY.getLogger(options.category || 'network');
    const level = options.level || 'auto';
    const format = options.format || ':method :url :status :content-length - :response-time ms';
    return log4js.connectLogger(logger, {level, format});
  }

  static addAppender(appender) {
    return Logger.LOGGER_FACTORY.addAppender(appender);
  }
}
