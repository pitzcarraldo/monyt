import Sender from './Sender';
import graphite from 'graphite';

export default class GraphiteSender extends Sender {
  constructor(options = {}) {
    super();
    this.client = graphite.createClient(`plaintext://${options.host}:${options.port}/`);
  }

  send(metrics) {
    return new Promise((resolve, reject)=> {
      this.client.write(metrics, error => {
        if (error) {
          return reject(error);
        }
        return resolve(metrics);
      });
    });
  }
}
