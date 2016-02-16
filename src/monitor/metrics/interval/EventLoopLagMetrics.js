import eventLoopLag from 'event-loop-lag';
import Metrics from '../Metrics';

export default class EventLoopLagMetrics extends Metrics {
  constructor(options = {}) {
    super(options);
    this.id = 'eventLoopLag';
    this.lag = eventLoopLag(options.interval);
  }

  getMetricsValue() {
    return this.lag();
  }
}
