export default class Logger {
  constructor({logger}) {
    ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].map(level => {
      if (!logger[level]) {
        throw new Error(`Not Implemented : logger.${level}()`);
      }
      this[level] = (...logs) => logger[level](...logs)
    });
  }
};
