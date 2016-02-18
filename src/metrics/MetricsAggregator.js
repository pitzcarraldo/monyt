import {DEFAULT_INTERVAL} from '../constants';

export default class MetricsAggregator {
  /**
   * @param {Object} [options={}] - Options to initialize MetricsAggregator.
   * @param {string} [options.prefix=''] - Prefix of metrics name.
   * @param {Array} [options.metricses=[]] - Metricses to aggregate.
   * @param {number} [options.interval=30000] - Interval to aggregate.
   * @param {Promise} [options.listener=new Promise()] - Listener promise when invoked aggregate.
   */
  constructor(options = {}) {
    this.prefix = options.prefix || '';
    this.metricses = options.metricses || [];
    this.interval = options.interval || DEFAULT_INTERVAL;
  }

  listen() {
    return new Promise(resolve => {
      setInterval(()=> {
        return resolve(this.aggregate());
      }, this.interval);
    });
  }

  aggregate() {
    return new Promise((resolve, reject)=> {
      try {
        return resolve(this.metricses.reduce((metricses, metrics) => {
          metricses[this.prefix + metrics.getName()] = metrics.getValue();
          return metricses;
        }, {}));
      } catch (e) {
        return reject(e);
      }
    });
  }

  markMiddleware() {
    const requestMarker = this.metricses.find(metrics => metrics.name = 'requestCount');
    const errorMarker = this.metricses.find(metrics => metrics.name = 'errorCount');
    return (req, res, next) => {
      requestMarker && requestMarker.mark && requestMarker.mark();
      if (res.statusCode >= 400) {
        errorMarker && errorMarker.mark && errorMarker.mark();
      }
      next();
    };
  }
}
