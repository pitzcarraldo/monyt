import memwatch from 'memwatch-next';
import heapdump from 'heapdump';
import Metrics from '../Metrics';

export default class MemoryLeakMetrics extends Metrics {
  constructor(options = {}) {
    super(options);
    this.id = 'memory.leak';
    this.sender = options.sender;
    this.autoDump = options.autoDump || false;

    memwatch.on('leak', (stats) => {
      console.warn('Detected Memory Leaks', stats);
      this.sender.send(this.getMetrics(stats.growth));

      if (this.autoDump) {
        heapdump.writeSnapshot((err, filename) => {
          if (err) {
            console.error('Heap Dump Failed', err);
            return;
          }
          console.warn('Heap Dump Written To', filename);
        });
      }
    });
  }

  getMetrics(stats) {
    const metrics = {};
    metrics[this.getMetricsKey()] = stats.growth;
    return metrics;
  }
}
