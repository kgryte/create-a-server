'use strict';

var express = require( 'express' ),
	logger = require( './logger.js' ),
	next = require( './next.js' ),
	server = require( './../lib' );

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
