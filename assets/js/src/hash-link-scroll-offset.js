/**
 * Hash Link Scroll Offset
 * http://webdevstudios.com
 *
 * Copyright (c) 2014 WebDevStudios
 * Licensed under the GPLv2+ license.
 */

/*jslint browser: true */
/*global jQuery:false */

window.Hash_Link_Scroll_Offset = window.Hash_Link_Scroll_Offset || {};

( function( window, document, $, app, undefined ){
	'use strict';

	app.scrollTo = 0;
	app.initialScroll = false;
	app.isScrolling = false;

	// Handle directly navigating to a hashed URL
	if ( window.location.hash ) {
		app.initialScroll = app.isScrolling = true;
	}

	app.init = function() {

		app.offset = app.getOffset();

		// cache jQuery selector results
		app.$html_and_body = $('html, body');

		// Handle clicking hash links
		$( 'a[href^="#"]:not(.no-scroll)' ).on( 'click', function( evt ) {
			app.scrollToHash( this.hash, evt );
		});

		if ( app.initialScroll ) {
			setTimeout( function() {
				window.scrollTo( 0, 0 );
				app.scrollToHash( window.location.hash );
			}, 10 );
		}

	};

	app.getOffset = function() {
		var offset = window.hlso_offset ? window.hlso_offset.offset : 0;

		// increase the offset by 32px if the WP Admin Bar is present
		if ( $( '#wpadminbar' ).length ) {
			offset = ( parseInt( offset, 10 ) + 32 ).toString();
		}

		return offset;
	};

	app.scrollToHash = function( hash, evt ) {
		// Check if linking to ID
		var $element_to_scroll_to = $( hash );

		// If not..
		if ( ! $element_to_scroll_to.length ) {
			// Check if linking to a named anchor
			$element_to_scroll_to = $( '[name="' + hash.substr(1) + '"]' );
		}

		if ( ! $element_to_scroll_to.length ) {
			return;
		}

		if ( $element_to_scroll_to.hasClass( '.no-scroll' ) || $element_to_scroll_to.parents( '.no-scroll-wrap' ).length ) {
			return;
		}

		app.isScrolling = true;

		app.scrollTo = $element_to_scroll_to.offset().top - app.offset;

		app.$html_and_body.trigger( 'hash_link_scroll_offset.scroll_to', app.scrollTo );

		app.scroll( app.scrollTo );

		if ( evt.preventDefault ) {
			evt.preventDefault();
			window.location.hash = hash;
		}

	};

	app.scroll = function( scrollTo ) {
		app.$html_and_body.stop().animate({
			'scrollTop': scrollTo // scroll and offset
		}, 900, 'swing', function( evt ) {
			app.initialScroll = app.isScrolling = false;
			app.$html_and_body.trigger( 'hash_link_scroll_offset.complete', evt );
		} );
	};

	$( app.init );

	return app;

} )( window, document, jQuery, window.Hash_Link_Scroll_Offset );
