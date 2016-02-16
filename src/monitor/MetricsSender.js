import graphite from 'graphite';

export default class MetricsSender {
  constructor(options = {}) {
    if(!options.graphite) {
      throw new Error('graphite information is required.');
    }
    this.client = graphite.createClient(`plaintext://${options.graphite.host}:${options.graphite.port}/`);
  }

  send(metrics) {
    this.client.write(metrics, (error) => {
      if (error) {
        console.error('Metrics sent failed: ', error);
      }
    });
  }
}
