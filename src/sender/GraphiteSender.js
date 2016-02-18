import Sender from './Sender';
import graphite from 'graphite';

export default class GraphiteSender extends Sender {
  constructor(options = {}) {
    super(graphite.createClient(`plaintext://${options.host}:${options.port}/`));
  }

  send(metrics) {
    this.client.write(metrics, error => {
      if (error) {
        return Promise.reject(error);
      }
      return Promise.resolve();
    });
  }
}
