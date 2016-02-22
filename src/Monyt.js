import { DEFAULT_INTERVAL } from './constants';
import LoggerFactory from './logger/LoggerFactory';
import MetricsAggregator from './metrics/MetricsAggregator';

export default class Monyt {
  /**
   * @param {Object} [options={}] - Options to initialize Monyt.
   * @param {string} [options.interval=30000] - Interval to listen aggregate.
   * @param {Array<Metrics>} [options.metricses=[]] - List of Metrics to aggregate.
   * @param {Array<Sender>} [options.senders=[]] - List of sender to send metricses.
   * @param {Promise} [options.listener=new Promise()] - Listener of MetricsAggregator.
   * @param {string} [options.prefix=''] - Prefix of metrics name.
   * @param {Object} [options.aggregator=new MetricsAggregator({...options, interval: this.interval})] - Instance of MetricsAggregator.
   * @param {Logger} [options.logger=LoggerFactory.FACTORY] - Logger Class to use.
   * @param {boolean} [options.replaceConsole=false] - Replace Console with Logger.
   * @return {Monyt} - new Monyt Instances.
   */
  constructor(options = {}) {
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.senders = options.senders || [];
    this.listener = '';
    this.aggregator = options.aggregator || new MetricsAggregator({ ...options, interval: this.interval });
    this.replaceConsole = options.replaceConsole || false;
    options.logger && LoggerFactory.setFactory(options.logger);
  }

  /**
   * Start to aggregate and send metricses.
   * Replace Console to default logger when replaceConsole is true.
   * @param {Function} callback - callback function that returns result promises of senders.
   * @returns {Number} - interval listener id.
   */
  listen(callback) {
    this.replaceConsole && this.getLogger({ replaceConsole: this.replaceConsole });
    return this.aggregator.listen((metricses)=> {
      Promise.all(this.senders.map(sender => sender.send(metricses)))
        .then(results => callback && callback(Promise.resolve(results)))
        .catch(error => callback && callback(Promise.reject(error)));
    });
  }

  /**
   * Stop to listen.
   * @returns {Number} - result of clearListener.
   */
  stop() {
    return this.aggregator.stop();
  }

  /**
   * @returns {Logger} logger - Default logger instance.
   */
  getLogger(options) {
    return LoggerFactory.getLogger(options);
  }

  /**
   * @returns {Array} middlewares - List of middlewares to mark and log requests and errors.
   */
  middlewares() {
    return [this.aggregator.markMiddleware(), LoggerFactory.logMiddleware()];
  }
}
