import chai, { expect } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai'
import { ProcessSender } from '../../src/index';

chai.use(sinonChai);

describe('ProcessSender', () => {

  describe('sendClient', () => {

    it('should called in constructor when host and port are exist', () => {
      process.send = spy();
      const client = { host: 'host', port: 2003 };
      const sender = new ProcessSender(client);
      expect(process.send).calledWithMatch({ client });
    });
    
  });

  describe('send', () => {

    it('should print waning', async(done) => {
      try {
        const sender = new ProcessSender();
        const metrics = {
          requestCounts: 100
        };
        const result = await sender.send(metrics);
        expect(result).not.to.be.empty;
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should return aggregated metricses', async(done) => {
      try {
        process.send = spy();
        const sender = new ProcessSender();
        const metrics = {
          requestCounts: 100
        };
        const result = await sender.send(metrics);
        expect(result).not.to.be.empty;
        expect(process.send).calledWithMatch({ metrics });
        done();
      } catch (error) {
        done(error);
      }
    });

  });
});
