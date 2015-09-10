'use strict';

// MODULES //

var cluster = require( 'cluster' ),
	merge = require( 'utils-merge2' )(),
	httpServer = require( '@kgryte/http-server' ),
	httpsServer = require( '@kgryte/https-server' ),
	serverCluster = require( '@kgryte/server-cluster' ),
	validate = require( './validate.js' );


// VARIABLES //

var DEFAULTS = require( './defaults.json' );


// SERVER //

/**
* FUNCTION: server( [ options,] logger[, requestListener] )
*	Returns a function to create an HTTP/S server (or server cluster).
*
* @param {Object} [options] - function options
* @param {Number} [options.port=0] - server port
* @param {String} [options.address="0.0.0.0"] - server address
* @param {String} [options.hostname] - server hostname
* @param {Number} [options.maxport] - max server port when port hunting.
* @param {Boolean} [options.ssl=false] - indicates whether to enable HTTPS
* @param {String} [options.key] - path to private key for TLS/SSL
* @param {String} [options.cert] - path to public certificate for TLS/SSL
* @param {Boolean} [options.cluster=false] - indicates whether to create a server cluster
* @param {Number} [options.size] - cluster size
* @param {Logger} logger - logger
* @param {Function} [requestListener] - callback to invoke upon receiving an HTTP request
* @returns {Function} function to create a server (or server cluster)
*/
function server( options, logger, requestListener ) {
	var create,
		opts,
		err;

	// TODO: variadic function!!!

	opts = merge( {}, DEFAULTS, options );
	err = validate( opts );
	if ( err ) {
		throw err;
	}
	if ( opts.cluster && cluster.isMaster ) {
		create = serverCluster({ 'size': opts.size }, logger );
	}
	else if ( opts.ssl ) {
		create = httpsServer( options, logger, requestListener );
	}
	else {
		create = httpServer( options, logger, requestListener );
	}
	/**
	* FUNCTION: createServer( done )
	*	Creates an HTTP/S server (or server cluster) and begins listening for HTTP requests.
	*
	* @param {Function} done - callback to invoke once a server is ready to receive HTTP requests
	* @returns {Void}
	*/
	return function createServer( done ) {
		create( clbk );

		/**
		* FUNCTION: clbk( [error], server )
		*	Callback invoked once the server is ready.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Server} server - server instance (or server master)
		* @returns {Void}
		*/
		function clbk( error, server ) {
			if ( error ) {
				return done( error );
			}
			done( null, server );
		}
	}; // end FUNCTION createServer()
} // end FUNCTION server()


// EXPORTS //

module.exports = server;
