import { expect } from 'chai';
import { spy } from 'sinon';
import { Sender } from '../../src/index';


describe('Sender', () => {
  describe('constructor', () => {
    it('should throw Error when send() is not exist', () => {
      expect(()=>{new Sender();}).to.throw(Error);
    });
  });
});
