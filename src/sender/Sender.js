export default class Sender {
  constructor(client) {
    if (!client) {
      throw new Error('client is empty, Sender needed client.');
    }
    this.client = client;
    if (!this.send) {
      throw new Error('Not implemented: send()');
    }
  }
}
