import memwatch from 'memwatch-next';
import heapdump from 'heapdump';
import Metrics from '../Metrics';
import warning from '../../warning';

export default class MemoryLeakMetrics extends Metrics {
  constructor(options = {}) {
    super();
    this.name = 'memoryLeak';
    this.value = {};
    this.autoDump = options.autoDump || false;
    this.listen();
  }

  listen() {
    memwatch.on('leak', stats => {
      warning(`Detected Memory Leaks ${stats}`);
      this.value = stats;
      if (this.autoDump) {
        heapdump.writeSnapshot((err, filename) => {
          if (err) {
            warning(`Heap Dump Failed ${err}`);
            return;
          }
          warning(`Heap Dump Written To ${filename}`);
        });
      }
    });
  }

  getValue() {
    const value = { ...this.value };
    this.value = {};
    return value;
  }
}
