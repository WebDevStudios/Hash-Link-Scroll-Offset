/**
 * Hash Link Scroll Offset
 * http://webdevstudios.com
 *
 * Copyright (c) 2014 WebDevStudios
 * Licensed under the GPLv2+ license.
 */

/*jslint browser: true */

window.Hash_Link_Scroll_Offset = window.Hash_Link_Scroll_Offset || {};

( function( window, document, app ){
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
		app.$html_and_body = document.querySelectorAll('html, body');

		var checkScroll = document.querySelectorAll('a:not(.no-scroll)');
		checkScroll.forEach(function (a) {
			a.addEventListener('click', function (evt) {
				app.hash = this.hash;
				if ( ! app.hash ) {
					return;
				}
				app.scrollToHash( app.hash, evt );
			});
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

		if ( document.getElementById( 'wpadminbar' ) ) {
			offset = ( parseInt( offset, 10 ) + 32 ).toString();
		}

		return offset;
	};

	app.getHashElement = function( hash ) {
		var isEl = typeof hash === 'object';

		// Check if linking to ID
		var $element_to_scroll_to = isEl ? hash : document.getElementById( hash.substr(1) );

		// If not..
		if ( ! $element_to_scroll_to && ! isEl ) {
			// Check if linking to a named anchor
			$element_to_scroll_to = document.querySelector( '[name="' + hash.substr(1) + '"]' );
		}

		if ( ! $element_to_scroll_to) {
			return false;
		}

		if ( $element_to_scroll_to.classList.contains( 'no-scroll' ) || $element_to_scroll_to.closest( '.no-scroll-wrap' ) ) {
			return false;
		}

		return $element_to_scroll_to;
	};

	app.scrollToHash = function( hash, evt ) {
		var $element_to_scroll_to = typeof hash === 'object' ? hash : app.getHashElement( hash );

		if ( ! $element_to_scroll_to ) {
			return;
		}

		app.isScrolling = true;

		app.scrollTo = $element_to_scroll_to.getBoundingClientRect().top - app.offset;

		var event = new Event('hash_link_scroll_offset.scroll_to');
		app.$html_and_body.forEach(function (el) {
			el.dispatchEvent(event);
		});

		app.scroll( app.scrollTo );

		if ( evt && evt.preventDefault ) {
			evt.preventDefault();
			window.location.hash = app.hash;
		}

	};

	app.scroll = function( scrollTo ) {
		window.scrollTo({
			top: scrollTo,
			behavior: "smooth"
		});
		app.initialScroll = app.isScrolling = false;
		var event = new Event('hash_link_scroll_offset.complete');

		app.$html_and_body.forEach(function (el) {
			el.dispatchEvent(event);
		});
	};

	app.init();

	return app;

} )( window, document, window.Hash_Link_Scroll_Offset );
