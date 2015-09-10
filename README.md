Create a Server
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Create an HTTP/S [server](https://github.com/kgryte/node-http-server) (or server [cluster](https://github.com/kgryte/node-server-cluster)).


## Installation

``` bash
$ npm install create-a-server
```


## Usage

``` javascript
var server = require( 'create-a-server' );
```

#### server( [ options,] logger[, requestListener ] )

Returns a `function` to create an HTTP/S [server](https://github.com/kgryte/node-http-server) (or server [cluster](https://github.com/kgryte/node-server-cluster)).

``` javascript

```

The `function` accepts the following `options`:

*	__port__: server port. Default: `0`, i.e., randomly assigned.
*	__address__: server address. Default: `0.0.0.0`.
*	__hostname__: server hostname.
*	__maxport__: max server port when [port hunting](https://github.com/kgryte/node-http-server#notes). Default: `maxport=port`.
*	__ssl__: `boolean` indicating whether to create an [HTTPS](https://github.com/kgryte/node-https-server) server. Default: `false`.
*	__key__: path to private key for TLS/SSL.
*	__cert__: path to public certificate for TLS/SSL.
*	__cluster__: `boolean` indicating whether to run a server in [cluster](https://github.com/kgryte/node-server-cluster) mode. Default: `false`.
*	__size__: cluster size. Default: `num_cpus`.



#### create( done )

Creates an HTTP/S [server](https://github.com/kgryte/node-http-server) (or server [cluster](https://github.com/kgryte/node-server-cluster)).

``` javascript
var cluster = require( 'cluster' );

function done( error, server ) {
	if ( error ) {
		throw error;
	}
	if ( cluster.isMaster ) {
		console.log( 'All workers are ready.' );
	} else {
		console.log( server.address() );
	}
}

create( done );
```



## Examples

``` javascript
var express = require( 'express' ),
	logger = require( './logger.js' ),
	next = require( './next.js' ),
	server = require( 'create-a-server' );

// Specify server options...
var opts = {
	'port': 7331,
	'cluster': true,
	'size': 2
};

// Create an express app:
var app = express();

// Create a function for creating a server cluster...
var createServer = server( opts, logger, app );

// Create a cluster:
createServer( next );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/create-a-server.svg
[npm-url]: https://npmjs.org/package/create-a-server

[travis-image]: http://img.shields.io/travis/kgryte/create-a-server/master.svg
[travis-url]: https://travis-ci.org/kgryte/create-a-server

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/create-a-server/master.svg
[codecov-url]: https://codecov.io/github/kgryte/create-a-server?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/create-a-server.svg
[dependencies-url]: https://david-dm.org/kgryte/create-a-server

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/create-a-server.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/create-a-server

[github-issues-image]: http://img.shields.io/github/issues/kgryte/create-a-server.svg
[github-issues-url]: https://github.com/kgryte/create-a-server/issues
