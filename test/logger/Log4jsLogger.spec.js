import { expect } from 'chai';
import { Log4jsLogger } from '../../src/index';

describe('Log4jsLogger', () => {
  describe('constructor', () => {
    it('should return Log4jsLogger instance.', () => {
      const logger = new Log4jsLogger();
      expect(logger).to.be.instanceOf(Log4jsLogger);
    });
  });

  describe('logMiddleware', () => {
    it('should return middleware.', () => {
      expect(Log4jsLogger.logMiddleware()).to.be.a('function');
    });
  });
});
