import profiler from 'gc-profiler';
import Metrics from '../Metrics';

const DEFAULT_VALUE = {
  minor: 0,
  major: 0
};

export default class GarbageCollectionMetrics extends Metrics {
  constructor() {
    super();
    this.name = 'gc';
    this.value = DEFAULT_VALUE;
    this.listen();
  }

  listen() {
    profiler.on('gc', info => {
      this.value = this.toMetrics(info);
    });
  }

  getValue() {
    const value = { ...this.value };
    this.value = DEFAULT_VALUE;
    return value;
  }

  toMetrics(info) {
    return {
      minor: info.type === 'Scavenge' ? info.duration : 0,
      major: info.type === 'MarkSweepCompact' ? info.duration : 0
    };
  }
}
