import Log4jsLogger from './Log4jsLogger';

export default class LoggerFactory {
  static FACTORY = Log4jsLogger;

  static setFactory(Logger) {
    LoggerFactory.FACTORY = Logger;
  }

  static getLogger(options) {
    return LoggerFactory.FACTORY.getLogger(options);
  }

  static logMiddleware(options) {
    return LoggerFactory.FACTORY.logMiddleware(options);
  }
}
