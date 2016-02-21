import { expect } from 'chai';
import { spy } from 'sinon';
import httpMocks  from 'node-mocks-http';
import {
  MemoryMetrics,
  GarbageCollectionMetrics,
  MemoryLeakMetrics,
  EventLoopLagMetrics,
  RequestCountMetrics,
  ErrorCountMetrics,
  MetricsAggregator
} from '../../src/index';

describe('MetricsAggregator', () => {

  const metricses = [
    new MemoryMetrics(),
    new GarbageCollectionMetrics(),
    new MemoryLeakMetrics(),
    new EventLoopLagMetrics(),
    new RequestCountMetrics(),
    new ErrorCountMetrics()
  ];

  const aggregator = new MetricsAggregator({ metricses, interval: 1000 });

  describe('aggregate', () => {
    it('should return aggregated metricses', () => {
      const aggregated = aggregator.aggregate();
      expect(aggregated).not.to.be.empty;
    });
  });

  describe('listen', () => {
    it('should invoke listener at interval', function (done) {
      this.timeout(5000);
      aggregator.listen((aggregated) => {
        expect(aggregated).not.to.be.empty;
        done();
        aggregator.stop();
      });
    });
  });

  describe('markMiddleware', () => {
    it('should return metricses with requestCount and errorCount.', () => {
      const middleware = aggregator.markMiddleware();
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = spy();
      middleware(req, res, next);
      res.statusCode = 500;
      middleware(req, res, next);
      expect(aggregator.aggregate().requestCount).to.be.equal(2);
      expect(aggregator.aggregate().errorCount).to.be.equal(1);
    });
  });
});
