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

## Usage

### Basic

`monitor.js`

```js
import Monyt, {
    RequestCountMetrics,
    ErrorCountMetrics,
    MemoryMetrics,
    GarbageCollectionMetrics,
    EventLoopLagMetrics,
    GraphiteSender
} from 'monyt';

const interval = 60000; //default is 30000(ms)

const senders = [new GraphiteSender({
    host: 'my.graphite.host.com',
    port: '2003' //port of plaintext protocol
})];

const metricses = [
    new RequestCountMetrics(),
    new ErrorCountMetrics(),
    new MemoryMetrics(),
    new GarbageCollectionMetrics(),
    new EventLoopLagMetrics()
];

const monitor = new Monyt({
    interval,
    prefix: `${application}.${hostname}.${clusterId}`, //This could be server hostname or application name or clusterId and etc.
    senders,
    metricses
});

export default monitor;
```


`server.js`

```js
import Express from 'express';
import monitor from './monitor';

const logger = monitor.getLogger();

monitor.listen(results => {
    results
    .then(metricses=>logger.debug(metricses))
    .catch(error=>logger.error(error));
});

const app = new Express();
app.use(monyt.middlewares());
app.use('/', (req, res, next) => {
    logger.info('This is index.');
    res.send('hello monyt!');
});
```

### Make your own Metrics and Sender

`ProductBuyMetrics.js`

```js
import { Metrics } from 'monyt';

export default class ProductBuyMetrics extends Metrics {
    constructor() {
        super();
        this.name = 'product.buy';
        this.value = {}
    }

    buy(productId) {
        this.value[productId] = this.value[productId] || 0;
        this.value[productId] = this.value[productId] + 1;
    }
}
```


`MongoDBSender.js`

```js
import { Sender } from 'monyt';

export default class MongoDBSender extends Sender {
    constructor(options = {}) {
        super();
        this.client = options.db.collection('metrics');
    }

    send(metrics) {
     return new Promise((resolve, reject)=> {
         this.client.insert(metrics, (error, result) => {
         if (error) {
           return reject(error);
         }
         return resolve(result);
       });
     });
    }
}
```

`monitor.js`

```js
...
const productBuyMetrics = new ProductBuyMetrics()
const senders = [new MongoDBSender({db: mongodbClient});]
const metricses = [new ProductBuyMetrics()];
const monitor = new Monyt({
    ...
    senders,
    metricses,
    ...
});
export default monitor;
export productBuyMetrics;
```

`your-app.js`

```js
import { productBuyMetrics } from './monitor';

app.post('/buy/:user/:productId', (req, res, next) => {
    //...buying process...
    productBuyMetrics.buy(req.params.productId);
    res.send(buyResult);
});
```

## API

[ESDoc](http://pitzcarraldo.github.io/monyt/)

## Change History

[CHANGELOG][]

[CHANGELOG]: https://github.com/Pitzcarraldo/monyt/blob/master/CHANGELOG.md

## License

This software is free to use under the Minkyu Cho. MIT license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/Pitzcarraldo/monyt/blob/master/LICENSE

## Contributing

**Please don't hesitate to send a small pull-request or just leave anything you want as an issue.**

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
