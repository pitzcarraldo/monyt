import {DEFAULT_INTERVAL} from './constants';
import LoggerFactory from './logger/LoggerFactory';
import MetricsAggregator from './metrics/MetricsAggregator';

export default class Monyt {
  /**
   * @param {Object} [options={}] - Options to initialize Monyt.
   * @param {string} [options.interval=300000] - Interval to listen aggregate.
   * @param {Array} [options.metricses=[]] - List of Metrics to aggregate.
   * @param {Array} [options.senders=[]] - List of sender to send metricses.
   * @param {Promise} [options.listener=new Promise()] - Listener of MetricsAggregator.
   * @param {string} [options.prefix=''] - Prefix of metrics name.
   * @param {Object} [options.aggregator=new MetricsAggregator({...options, interval: this.interval})] - Instance of MetricsAggregator.
   */
  constructor(options = {}) {
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.senders = options.senders || [];
    this.listener = options.listener || new Promise();
    this.aggregator = options.aggregator || new MetricsAggregator({...options, interval: this.interval});
  }

  /**
   * @param {Promise} listener - Listener of MetricsAggregator.
   * @returns {Promise.<T>} Results of sender.
   */
  listen(listener = this.listener) {
    return this.aggregator.listen(listener)
      .then(metricses => this.senders.map(sender => sender.send(metricses)))
      .catch(error => console.error(error));
  }

  /**
   * @param {Object} options - Options to setup logMiddleware().
   * @param {string} [options.category=request] - Category name of request logger.
   * @param {string} [options.category=auto] - Level to log.
   * @param {string} [options.format=:method :url :status :content-length - :response-time ms] - Log format of request logger.
   * @returns {*[]} middlewares to request logging and aggregate metricses.
   */
  middlewares(options) {
    return [this.aggregator.markMiddleware(), LoggerFactory.logMiddleware(options)]
  }
}
