import { expect } from 'chai';
import { Logger } from '../../src/index';

describe('Logger', () => {
  describe('getLogger', () => {
    it('should return logger with category name.', () => {
      const logger = Logger.getLogger({
        category: 'test'
      });
      expect(logger.category).to.be.equal('test');
    });

    it('should return not null when options is empty.', () => {
      const logger = Logger.getLogger();
      expect(logger).to.not.be.empty;
    });
  });

  describe('middleware', () => {
    it('should return morgan instance.', () => {
      Logger.getLogger();
      const actual = Logger.middleware();
      expect(actual).to.be.instanceof(Function);
    });
  });
});
