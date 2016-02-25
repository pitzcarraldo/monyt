import Sender from './Sender';
import warning from '../warning';

export default class ProcessSender extends Sender {
  constructor() {
    super();
    this.sendMessage = process.send;
    if (!this.sendMessage) {
      warning('Process Sender only can work in clusters mode. This Process Sender will not send metricses.');
      this.sendMessage = () => {
      };
    }
  }

  send(metrics) {
    return new Promise((resolve, reject) => {
      try {
        this.sendMessage(metrics);
        return resolve(metrics);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
