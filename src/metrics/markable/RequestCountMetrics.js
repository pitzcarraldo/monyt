import Measured from 'measured';
import MarkableMetrics from './MarkableMetrics';

export default class RequestCountMetrics extends MarkableMetrics {
  constructor() {
    super(new Measured.Meter());
    this.name = 'requestCount';
  }

  getValue() {
    return this.marker.toJSON().count;
  }
}
