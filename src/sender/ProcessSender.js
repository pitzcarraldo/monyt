import Sender from './Sender';
import warning from '../warning';

export default class ProcessSender extends Sender {
  constructor() {
    super();
    if (!process.send) {
      warning('Process Sender only can work in clusters mode. This Process Sender will not send metricses.');
      process.send = () => {
      };
    }
  }

  send(metrics) {
    return new Promise((resolve, reject) => {
      try {
        process.send(metrics);
        return resolve(metrics);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
