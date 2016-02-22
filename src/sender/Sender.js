export default class Sender {
  constructor() {
    if (!this.send) {
      throw new Error('Not implemented: send()');
    }
  }
}
