import { DEFAULT_INTERVAL } from '../../constants';
import eventLoopLag from 'event-loop-lag';
import Metrics from '../Metrics';

export default class EventLoopLagMetrics extends Metrics {
  constructor(options = {}) {
    super();
    this.name = 'eventLoopLag';
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.lag = eventLoopLag(this.interval);
  }

  getValue() {
    return this.lag();
  }
}
