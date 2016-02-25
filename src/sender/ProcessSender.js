import Sender from './Sender';
import warning from '../warning';

export default class ProcessSender extends Sender {
  constructor(options = {}) {
    super();
    if (!process.send) {
      warning('Process Sender only can work in clusters mode. This Process Sender will not send metricses.');
      process.send = () => {
      };
    }
    this.sendClient(options.host, options.port);
  }

  sendClient(host, port) {
    if (!host || !port) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      try {
        process.send({ client: { host, port } });
        return resolve({ host, port });
      } catch (error) {
        return reject(error);
      }
    });
  }

  send(metrics) {
    return new Promise((resolve, reject) => {
      try {
        process.send({ metrics });
        return resolve(metrics);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
