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

( function( window, document, $, app ){
	'use strict';

	app.scrollTo = 0;
	app.initialScroll = false;
	app.isScrolling = false;
	app.hash = null;

	// Handle directly navigating to a hashed URL
	if ( window.location.hash ) {
		app.initialScroll = true;
	}

	app.init = function() {

		app.offset = app.getOffset();

		// cache jQuery selector results
		app.$html_and_body = $('html, body');

		$( 'a[href*="#"]:not(.no-scroll)' ).on( 'click', function( evt ) {
			app.hash = this.hash;

			if ( ! $( app.hash ) ) {
				return;
			}

			app.scrollToHash( app.hash, evt );
		});

		if ( app.initialScroll ) {
			app.hash = window.location.hash;
			var $element_to_scroll_to = app.getHashElement( app.hash );

			if ( ! $element_to_scroll_to ) {
				return;
			}

			setTimeout( function() {
				app.isScrolling = true;
				window.scrollTo( 0, 0 );
				app.scrollToHash( $element_to_scroll_to );
			}, 10 );
		}

	};

	app.getOffset = function() {
		var offset = window.hlso_offset ? window.hlso_offset.offset : 0;

		if ( $( '#wpadminbar' ).length ) {
			offset = ( parseInt( offset, 10 ) + 32 ).toString();
		}

		return offset;
	};

	app.getHashElement = function( hash ) {
		var isEl = ( hash instanceof jQuery );

		// Check if linking to ID
		var $element_to_scroll_to = isEl ? hash : $( hash );

		// If not..
		if ( ! $element_to_scroll_to.length && ! isEl ) {
			// Check if linking to a named anchor
			$element_to_scroll_to = $( '[name="' + hash.substr(1) + '"]' );
		}

		if ( ! $element_to_scroll_to.length ) {
			return false;
		}

		if ( $element_to_scroll_to.hasClass( '.no-scroll' ) || $element_to_scroll_to.parents( '.no-scroll-wrap' ).length ) {
			return false;
		}

		return $element_to_scroll_to;
	};

	app.scrollToHash = function( hash, evt ) {
		var $element_to_scroll_to = hash instanceof jQuery ? hash : app.getHashElement( hash );

		if ( ! $element_to_scroll_to || ! $element_to_scroll_to.length ) {
			return;
		}

		app.isScrolling = true;

		app.scrollTo = $element_to_scroll_to.offset().top - app.offset;

		app.$html_and_body.trigger( 'hash_link_scroll_offset.scroll_to', app.scrollTo );

		app.scroll( app.scrollTo );

		if ( evt && evt.preventDefault ) {
			evt.preventDefault();
			window.location.hash = app.hash;
		}

	};

	app.scroll = function( scrollTo ) {
		app.$html_and_body.stop().animate({
			'scrollTop': scrollTo
		}, 900, 'swing', function( evt ) {
			app.initialScroll = app.isScrolling = false;
			app.$html_and_body.trigger( 'hash_link_scroll_offset.complete', evt );
		} );
	};

	$( app.init );

	return app;

} )( window, document, jQuery, window.Hash_Link_Scroll_Offset );
