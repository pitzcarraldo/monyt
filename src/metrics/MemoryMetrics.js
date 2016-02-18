import Metrics from './Metrics';

export default class MemoryMetrics extends Metrics {
  constructor() {
    super();
    this.name = 'memory';
  }

  getValue() {
    return process.memoryUsage();
  }
}
