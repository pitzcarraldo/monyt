import Metrics from '../Metrics';

export default class MarkableMetrics extends Metrics {
  constructor(marker) {
    super();
    if (!marker) {
      throw new Error('marker is empty. Please check your constructor.');
    }
    if (!marker.mark) {
      throw new Error('Not Implemented: marker.mark()');
    }
  }

  mark() {
    this.marker.mark();
  }
}
