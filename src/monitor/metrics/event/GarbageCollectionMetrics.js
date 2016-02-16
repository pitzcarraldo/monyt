import gc from 'gc-stats';
import Metrics from '../Metrics';

export default class GarbageCollectionMetrics extends Metrics {
  constructor(options = {}) {
    super(options);
    this.id = 'gc';
    this.gc = (gc)();
    this.sender = options.sender;
    this.gc.on('stats', (stats) => {
      this.sender.send(this.getMetrics(stats));
    });
  }

  getMetrics(stats) {
    const metrics = {};
    const gcType = this.getGCType(stats.gctype);
    const key = this.getMetricsKey() + '.' + gcType;
    metrics[key] = stats.pauseMS;
    return metrics;
  }

  getGCType(type) {
    switch (type) {
      case 1 :
        return 'minor';
      case 2 :
      case 3 :
        return 'major';
      default :
        return '';
    }
  }
}
