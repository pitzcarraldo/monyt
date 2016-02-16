import os from 'os';
import cluster from 'cluster';

export default class Metrics {
  constructor(options = {}) {
    this.project = options.project || process.env.npm_package_project || 'unnamed';
    this.service = options.service || process.env.npm_package_name || 'unnamed';
    this.clusterId = cluster.isWorker ? cluster.worker.id : 'master';
    this.prefix = ['hosts', this.project, this.service, os.hostname(), this.clusterId, 'node'].join('.');
    this.id = options.id || '';
    this.metrics = options.metrics || 0;
  }

  getMetricsKey() {
    return this.prefix + '.' + this.id;
  }

  getMetricsValue() {
    return this.metrics;
  }

  getMetrics() {
    const metrics = {};
    metrics[this.getMetricsKey()] = this.getMetricsValue();
    return metrics;
  }
}
