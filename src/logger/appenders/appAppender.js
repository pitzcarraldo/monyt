const STACK_LIMIT = 11;
Error.stackTraceLimit = STACK_LIMIT;

export default {
  type: 'console',
  category: 'app',
  layout: {
    type: 'pattern',
    pattern: '%-5p %d{yyyy-MM-dd hh:mm:ss} [process-%y]%x{line} - %m',
    tokens: {
      line: function () {
        return (new Error)
          .stack
          .split('\n')[STACK_LIMIT]
          .split('at')[1];
      }
    }
  }
};

