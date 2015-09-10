'use strict';

// MODULES //

var bunyan = require( 'bunyan' );


// LOGGER //

var logger = bunyan.createLogger({
	'name': 'logger',
	'streams': [
		{
			'name': 'main',
			'level': 'info',
			'stream': process.stdout
		}
	]
});


// EXPORTS //

module.exports = logger;
