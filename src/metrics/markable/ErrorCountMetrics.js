import Measured from 'measured';
import MarkableMetrics from './MarkableMetrics';

export default class ErrorCountMetrics extends MarkableMetrics {
  constructor() {
    super(new Measured.Meter());
    this.name = 'errorCount';
  }

  getValue() {
    return this.marker.toJSON().currentRate;
  }
}
