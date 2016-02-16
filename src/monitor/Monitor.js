import eventMetrics from './metrics/event/index';
import intervalMetrics from './metrics/interval/index';
import MetricsSender from './MetricsSender';

export default class Monitor {
  constructor(options = {}) {
    this.interval = options.interval || 1000 * 30;
    this.sender = new MetricsSender(options);
    this.eventMetrics = this.initEventMetrics({...options, sender: this.sender});
    this.intervalMetrics = this.initIntervalMetrics({...options, interval: this.interval});
    this.setDefaultEvents();
  }

  setDefaultEvents() {
    setInterval(() => {
      this.sender.send(this.getIntervalMetrics());
    }, this.interval);
  }

  initEventMetrics(options) {
    const metrics = {};
    Object.keys(eventMetrics).map((key) => {
      metrics[key] = new eventMetrics[key](options);
    });
    return metrics;
  }

  initIntervalMetrics(options) {
    const metrics = {};
    Object.keys(intervalMetrics).map((key) => {
      metrics[key] = new intervalMetrics[key](options);
    });
    return metrics;
  }

  getIntervalMetrics() {
    const metrics = {};
    Object.keys(this.intervalMetrics).map((key) => {
      let metric = this.intervalMetrics[key];
      metrics[metric.getMetricsKey()] = metric.getMetricsValue();
    });
    return metrics;
  }

  middleware() {
    const { RequestCountMetrics, ErrorCountMetrics } = this.intervalMetrics;
    return (req, res, next) => {
      RequestCountMetrics.mark();
      if (res.statusCode >= 400) {
        ErrorCountMetrics.mark();
      }
      next();
    };
  }
}
