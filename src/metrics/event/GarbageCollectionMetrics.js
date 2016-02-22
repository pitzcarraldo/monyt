import gc from 'gc-stats';
import Metrics from '../Metrics';

export default class GarbageCollectionMetrics extends Metrics {
  constructor() {
    super();
    this.gc = (gc)();
    this.name = 'gc';
    this.value = {};
    this.listen();
  }

  listen() {
    this.gc.on('stats', stats => {
      this.value = (this.toMetrics(stats));
    });
  }

  getValue() {
    const value = { ...this.value };
    this.value = {};
    return value;
  }

  toMetrics(stats) {
    const metrics = {};
    const gcType = this.getGCType(stats.gctype);
    metrics[gcType] = stats.pauseMS;
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
