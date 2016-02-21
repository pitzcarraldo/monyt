import { expect } from 'chai';
import { Logger, LoggerFactory, Log4jsLogger } from '../../src/index';

describe('LoggerFactory', () => {
  class TestLogger extends Logger {
    constructor() {
      super({ logger: [ 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ].reduce((logger, level)=> {
        logger[level] = console.log;
        return logger;
      }, {}) });
    }
  }

  describe('setFactory', () => {
    it('should set new Logger', () => {
      const loggerFactory = LoggerFactory.setFactory(TestLogger);
      expect(loggerFactory).to.be.equal(TestLogger);
    });
  });

  describe('getLogger', () => {
    it('should return instance of Log4jsLogger', () => {
      LoggerFactory.setFactory(Log4jsLogger);
      expect(LoggerFactory.getLogger()).to.be.instanceOf(Log4jsLogger);
    });
  });
  describe('logMiddleware', () => {
    it('should return logMiddleware of Log4jsLogger.', () => {
      expect(LoggerFactory.logMiddleware).to.be.a('function');
    });
  });
});
