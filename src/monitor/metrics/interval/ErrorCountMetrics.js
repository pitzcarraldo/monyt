import Measured from 'measured';
import Metrics from '../Metrics';

export default class MemoryMetrics extends Metrics {
  constructor(options = {}) {
    super(options);
    this.id = 'errorCount';
    this.errors = new Measured.Meter();
  }

  getMetricsValue() {
    const currentRate = this.errors.toJSON().currentRate;
    this.errors.reset();
    return currentRate;
  }

  mark() {
    return this.errors.mark();
  }
}
