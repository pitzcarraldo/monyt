import Measured from 'measured';
import Metrics from '../Metrics';

export default class MemoryMetrics extends Metrics {
  constructor(options = {}) {
    super(options);
    this.id = 'requestCount';
    this.requests = new Measured.Meter();
  }

  getMetricsValue() {
    const currentRate = this.requests.toJSON().currentRate;
    this.requests.reset();
    return currentRate;
  }

  mark() {
    return this.requests.mark();
  }
}
