'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive' ),
	isObject = require( 'validate.io-object' );


// VALIDATE //

/**
* FUNCTION: validate( opts )
*	Validates function options.
*
* @param {Object} opts - function options
* @param {Number} [opts.ssl] - boolean indicating whether to enable HTTPS
* @param {Number} [opts.cluster] - boolean indicating whether to run the server in cluster mode
* @returns {Error|Null} error or null
*/
function validate( opts ) {
	if ( !isObject( opts ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}
	if ( opts.hasOwnProperty( 'ssl' ) ) {
		if ( !isBoolean( opts.ssl ) ) {
			return new TypeError( 'invalid option. SSL option must be a primitive boolean. Option: `' + opts.ssl + '`.' );
		}
	}
	if ( opts.hasOwnProperty( 'cluster' ) ) {
		if ( !isBoolean( opts.cluster ) ) {
			return new TypeError( 'invalid option. Cluster option must be a primitive boolean. Option: `' + opts.cluster + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
