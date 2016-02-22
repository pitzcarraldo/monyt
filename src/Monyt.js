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
   * @return {Monyt} - new Monyt Instances.
   */
  constructor(options = {}) {
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.senders = options.senders || [];
    this.listener = '';
    this.aggregator = options.aggregator || new MetricsAggregator({ ...options, interval: this.interval });
    options.logger && LoggerFactory.setFactory(options.logger);
  }

  /**
   * Start to aggregate and send metricses.
   * Replace Console to default logger when replaceConsole is true.
   * @param {Function} callback - callback function that returns result promises of senders.
   * @returns {Number} - interval listener id.
   */
  listen(callback) {
    return this.aggregator.listen((metricses)=> {
      callback && callback(
        Promise.all(this.senders.map(sender => sender.send(metricses)))
      );
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
  getLogger() {
    return LoggerFactory.getLogger();
  }

  /**
   * @returns {Array} middlewares - List of middlewares to mark and log requests and errors.
   */
  middlewares() {
    return [ this.aggregator.markMiddleware(), LoggerFactory.logMiddleware() ];
  }
}
