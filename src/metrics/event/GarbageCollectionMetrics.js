import gc from 'gc-stats';
import Metrics from '../Metrics';

export default class GarbageCollectionMetrics extends Metrics {
  constructor() {
    super();
    this.name = 'gc';
    this.listen();
  }

  listen() {
    gc.on('stats', stats => {
      this.value = (this.toMetrics(stats));
    });
  };

  toMetrics(stats) {
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
