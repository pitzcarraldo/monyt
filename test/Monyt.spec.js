import chai, { expect } from 'chai';
import { spy, mock } from 'sinon';
import sinonChai from 'sinon-chai';
import Monyt, {
  Sender,
  MemoryMetrics,
  GarbageCollectionMetrics,
  MemoryLeakMetrics,
  EventLoopLagMetrics,
  RequestCountMetrics,
  ErrorCountMetrics,
  MetricsAggregator
} from '../src/index';

chai.use(sinonChai);


describe('Monyt', () => {

  const metricses = [
    new MemoryMetrics(),
    new GarbageCollectionMetrics(),
    new MemoryLeakMetrics(),
    new EventLoopLagMetrics(),
    new RequestCountMetrics(),
    new ErrorCountMetrics()
  ];

  class MockSender extends Sender {
    constructor() {
      super();
      this.client = { send: spy() };
    }

    send(metrics) {
      return new Promise((resolve)=> {
        this.client.send(metrics);
        resolve(metrics);
      });
    }
  }
  const senders = [ new MockSender() ];
  const monyt = new Monyt({ metricses, senders, interval: 1000 });

  describe('listen', () => {
    it('should return result ', function (done) {
      this.timeout(5000);
      monyt.listen((results)=> {
        expect(senders[0].client.send).called;
        results.then(metricses => {
          expect(metricses).not.to.be.empty;
        });
        done();
        monyt.stop();
      });
    });
  });
});
