# [Monyt](https://pitzcarraldo.github.io/monyt)

## Monitoring Module for Node.js Applications

[![Build Status](https://travis-ci.org/Pitzcarraldo/monyt.svg)](https://travis-ci.org/Pitzcarraldo/monyt)
[![Coverage Status](https://coveralls.io/repos/github/Pitzcarraldo/monyt/badge.svg?branch=master)](https://coveralls.io/github/Pitzcarraldo/monyt?branch=master)
[![npm version](https://img.shields.io/npm/v/monyt.svg?style=flat-square)](https://www.npmjs.com/package/monyt)
[![npm downloads](https://img.shields.io/npm/dm/monyt.svg?style=flat-square)](https://www.npmjs.com/package/monyt)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Pitzcarraldo/monyt)

Monyt provides abstracted interfaces to log and monitor for Node.js Applications.

## Installation

```bash
$ npm i -S monyt
```

## API

### `Logger`

Logging Module like Slf4j(or Log4j) wrapping the [Log4js](https://github.com/nomiddlename/log4js-node).
The Logger provides logger like what used in Java Application, becaus using same format with Slf4j.

```js
%-5p %d{yyyy-MM-dd hh:mm:ss} [process-%y] %x{line} - %m
INFO  2016-01-04 13:30:21 [process-21465] Server.<anonymous> server.js:44 - production
```

#### `getLogger(options: object)`

Static method that returns new or exist Logger instance.

* `options`
  * `category(string, default: 'app')`: Category of logger. Yon can categorise logger to use another configuration for each loggers.
  * `level(string)`: Limit level to print. ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, MARK, OFF.
  * `replaceConsole(boolean)`: Determine whether to replace console with logger. If this is true, you can logger with javascript console.log. Level of console.log is 'INFO'.

##### Usage

```js

const logger = Logger.getLogger({
  level : 'INFO',
  replaceConsole: true
});

logger.info('info log'); // print 'info log'
logger.debug('debug log'); // print nothing
console.info('info log'); //print 'info log'
console.log('info log'); //print 'info log'

```

#### `middleware(options: object)`

Static method that returns connect/express request logging middleware.

  * `options`
    * `category(string, default: 'network')`: Same with `getLogger()`.
    * `level(string)`: Same with `getLogger()`.
    * `format(string`: Format to formatting logs.
      * Format Tokens
        * :url, :protocol, :hostname, :method, :status, :response-time, :date, :referrer, :http-version, :remote-addr, :user-agent, :content-length

##### Usage

```js

const logger = Logger.middleware({
  replaceConsole: true
});

logger.info('info log'); // print 'info log'
logger.debug('debug log'); // print nothing
console.info('info log'); //print 'info log'
console.log('info log'); //print 'info log'

```

#### `addAppender(appender: object)`

Static method that add log4js appender to Logger. ([Appenders](https://github.com/nomiddlename/log4js-node/wiki/Appenders))

### `Monitor`

This sends metrics of Node.js Application to Graphite Server.
Monitor sends metrics like below.

  * Event Log Lag
  * Request Count
  * Error Count
  * Memory Usage
    * Heap Memory Usage
    * Total Heap Size
    * Resident Set Size
  * Garbase Collection Metrics
    * Major GC Time
    * Minor GC Time
  * Memory Leak Statistics (Memory increase amount)

#### `constructor(options: {})`

  * `options`
    * `interval(number)`: Interval for send the metrics.
    * `graphite`
      * `host(string)`: Graphite Server Host.
      * `port(number)`: Graphite Server Port.
    * `autoDump(boolean)`: Turn of Auto Dump. If this is true, invoke heap dump when application catch memory leak.

#### `middleware()`

Return connect/express middleware for collect request and error metrics.

### Change History

[CHANGELOG][]

[CHANGELOG]: https://github.com/Pitzcarraldo/monyt/blob/master/CHANGELOG.md

### License

This software is free to use under the Minkyu Cho. MIT license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/Pitzcarraldo/monyt/blob/master/LICENSE

### Contributing

**Please don't hesitate to send a small pull-request or just leave anything you want as an issue.**

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
