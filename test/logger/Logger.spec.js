import { expect } from 'chai';
import { Logger } from '../../src/index';

describe('Logger', () => {
  describe('constructor', () => {

    it('should throw Error when logger is empty.', () => {
      expect(()=> {
        new Logger();
      }).to.throw(Error);
    });

    it('should throw Error when logger.debug is not implemented.', () => {
      expect(()=> {
        new Logger({ logger: {} });
      }).to.throw(Error);
    });

    it('should return logger instance when core logger has all mandatory properties', () => {
      const coreLogger = [ 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ].reduce((logger, level)=> {
        logger[level] = console.log;
        return logger;
      }, {});
      const logger = new Logger({ logger: coreLogger });
      expect(logger.debug).not.to.be.empty;
    });

  });
});
