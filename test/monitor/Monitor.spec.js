import { expect } from 'chai';
import { Monitor } from '../../src/index';

describe('Monitor', () => {
  describe('constructor', () => {
    it('should throw graphite error when options is empty', () => {
      expect(()=>{new Monitor();}).to.throw(/graphite information is required/);
    });

    it('should return instance when options contain graphite information', () => {
      expect(()=>{new Monitor({
        graphite:{
          host: '127.0.0.1',
          port: '3003'
        }
      });}).not.to.be.empty;
    });
  });
});
