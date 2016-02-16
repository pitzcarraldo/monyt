import Metrics from '../Metrics';

export default class MemoryMetrics extends Metrics {
  constructor(options = {}) {
    super(options);
    this.id = 'memory';
  }

  getMetricsValue() {
    return process.memoryUsage();
  }
}
