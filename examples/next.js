'use strict';

// MODULES //

var cluster = require( 'cluster' );


// NEXT //

/**
* FUNCTION: next( error, server )
*	Callback invoked once a server is ready to receive HTTP requests.
*
* @param {Error|Null} error - error object
* @param {Server} server - server instance
* @returns {Void}
*/
function next( error, server ) {
	if ( error ) {
		throw error;
	}
	if ( cluster.isMaster ) {
		setTimeout( onTimeout, 2500 );
	} else {
		console.log( server.address() );
	}
}

/**
* FUNCTION: onTimeout()
*	Callback invoked after a specified interval.
*
* @returns {Void}
*/
function onTimeout() {
	cluster.disconnect( disconnect );
}

/**
* FUNCTION: disconnect()
*	Callback invoked once all workers are disconnected and handles are closed.
*
* @returns {Void}
*/
function disconnect() {
	process.nextTick( exit );
}

/**
* FUNCTION: exit()
*	Ends the process.
*
* @returns {Void}
*/
function exit() {
	process.exit( 0 );
}


// EXPORTS //

module.exports = next;
