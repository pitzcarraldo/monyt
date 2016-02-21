import { DEFAULT_INTERVAL } from '../constants';

export default class MetricsAggregator {
  /**
   * @param {Object} [options={}] - Options to initialize MetricsAggregator.
   * @param {string} [options.prefix=''] - Prefix of metrics name.
   * @param {Array} [options.metricses=[]] - Metricses to aggregate.
   * @param {number} [options.interval=30000] - Interval to aggregate.
   * @returns {MetricsAggregator} - new MetricsAggregator Instance.
   */
  constructor(options = {}) {
    this.prefix = options.prefix || '';
    this.metricses = options.metricses || [];
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.listener = '';
  }

  aggregate() {
    return this.metricses.reduce((metricses, metrics) => {
      metricses[this.prefix + metrics.getName()] = metrics.getValue();
      return metricses;
    },{});
  }

  listen(callback) {
    this.listener = setInterval(()=>{
      callback && callback(this.aggregate());
    }, this.interval);
    return this.listener;
  }

  stop() {
    return clearInterval(this.listener);
  }

  markMiddleware() {
    const requestMarker = this.metricses.find(metrics => metrics.name === 'requestCount');
    const errorMarker = this.metricses.find(metrics => metrics.name === 'errorCount');
    return (req, res, next) => {
      requestMarker && requestMarker.mark && requestMarker.mark();
      if (res.statusCode >= 400) {
        errorMarker && errorMarker.mark && errorMarker.mark();
      }
      next();
    };
  }
}
