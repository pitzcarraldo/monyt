import memwatch from 'memwatch-next';
import heapdump from 'heapdump';
import Metrics from '../Metrics';

export default class MemoryLeakMetrics extends Metrics {
  constructor(options = {}) {
    super();
    this.name = 'memoryLeak';
    this.autoDump = options.autoDump || false;
    this.listen();
  }

  listen() {
    memwatch.on('leak', stats => {
      console.warn('Detected Memory Leaks', stats);
      this.value = stats;
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
}
