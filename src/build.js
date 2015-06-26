'use strict';

/*\
|*| PERSONAL PORTFOLIO _________________________________________________________
|*| www.norlick.com -> norlick.github.io
|*| Built using Metalsmith (metalsmith.io)
\*/

// FLAGS
var	dev_build = false;

// INCLUDES
var	path			= require('path'),
	fs				= require('fs');

var	Metalsmith		= require('metalsmith'),
	markdown		= require('metalsmith-markdown'),
	permalinks		= require('metalsmith-permalinks'),
	collections		= require('metalsmith-collections'),
	pagination		= require('metalsmith-pagination'),
	ignore			= require('metalsmith-ignore'),
	templates		= require('metalsmith-templates'),
	paths			= require('metalsmith-paths'),
	minifyhtml		= require('metalsmith-html-minifier');

// DIRECTORIES
var __buildDir		= path.join( __dirname, '..' ),
	__sourceDir		= path.join( __dirname, 'content' ),
	__devDir		= '//localhost/web/github-pages/portfolio',
	__publishDir	= 'http://www.norlick.com';


// Init Metalsmith -------------------------------------------------------------
Metalsmith = Metalsmith(__dirname);

// BUILD -----------------------------------------------------------------------
Metalsmith
	// Directory setup ---------------------------------------------------------
	.clean(false).source( __sourceDir ).destination( __buildDir )

	// Global metadata ---------------------------------------------------------
	.metadata({
		sitename	: 'Norlick',
		rooturl		: ( dev_build ) ? __devDir : __publishDir
	})

	// Collections -------------------------------------------------------------
	.use( collections({
		articles : {
			pattern		: 'articles/*/index.md',
			sortBy		: 'date',
			reverse		: true
		},
		art : {
			pattern		: 'art/*/data.yaml',
			refer		: false
		},
		code : {
			pattern		: 'code/*/data.yaml',
			sortBy		: 'date',
			reverse 	: true,
			refer		: false
		}
	}) )

	.use( paths() )

	// Process Markdown --------------------------------------------------------
	.use( markdown() )

	// Permalinks --------------------------------------------------------------
	.use( permalinks({
		pattern		: ':collection/:title',
		relative	: false
	}) )

	// Apply templates ---------------------------------------------------------
	.use( templates({
		engine		: 'handlebars',
		directory	: 'templates',
		partials	: {
			header	: 'header',
			footer	: 'footer'
		}
	}) )
	.use( minifyhtml() )

	// Do not transfer YAML files to build dir ---------------------------------
	.use( ignore('*/*/*.yaml') )

	// BUILD -------------------------------------------------------------------
	.build( function( err, files ) {
		if (err) console.error(err);
		console.log( Metalsmith.metadata().art );
	//	console.log( Object.keys(files), Object.keys( Metalsmith.metadata() ) );
	} );
