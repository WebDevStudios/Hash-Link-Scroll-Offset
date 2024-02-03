/**
 * Hash Link Scroll Offset
 * http://webdevstudios.com
 *
 * Copyright (c) 2014 WebDevStudios
 * Licensed under the GPLv2+ license.
 */

/*jslint browser: true */

window.Hash_Link_Scroll_Offset = window.Hash_Link_Scroll_Offset || {};

( function ( window, document, app ) {
	'use strict';

	app.scrollTo = 0;
	app.initialScroll = false;
	app.isScrolling = false;
	app.hash = null;

	// Handle directly navigating to a hashed URL
	if ( window.location.hash ) {
		app.initialScroll = true;
	}

	app.init = function () {
		app.offset = app.getOffset();

		// cache jQuery selector results
		app.htmlAndBody = document.querySelectorAll( 'html, body' );

		const checkScroll = document.querySelectorAll( 'a:not(.no-scroll)' );
		checkScroll.forEach( function ( a ) {
			a.addEventListener( 'click', function ( evt ) {
				app.hash = this.hash;
				if ( ! app.hash ) {
					return;
				}
				app.scrollToHash( app.hash, evt );
			} );
		} );

		if ( app.initialScroll ) {
			app.hash = window.location.hash;
			const elementToScrollTo = app.getHashElement( app.hash );

			if ( ! elementToScrollTo ) {
				return;
			}

			setTimeout( function () {
				app.isScrolling = true;
				window.scrollTo( 0, 0 );
				app.scrollToHash( elementToScrollTo );
			}, 10 );
		}
	};

	app.getOffset = function () {
		let offset = typeof hlsOffset !== 'undefined' ? hlsOffset.offset : 0; // eslint-disable-line no-undef

		if ( document.getElementById( 'wpadminbar' ) ) {
			offset = ( parseInt( offset, 10 ) + 32 ).toString();
		}

		return offset;
	};

	app.getHashElement = function ( hash ) {
		const isEl = typeof hash === 'object';

		// Check if linking to ID
		let elementToScrollTo = isEl
			? hash
			: document.getElementById( hash.substr( 1 ) );

		// If not..
		if ( ! elementToScrollTo && ! isEl ) {
			// Check if linking to a named anchor
			elementToScrollTo = document.querySelector(
				'[name="' + hash.substr( 1 ) + '"]'
			);
		}

		if ( ! elementToScrollTo ) {
			return false;
		}

		if (
			elementToScrollTo.classList.contains( 'no-scroll' ) ||
			elementToScrollTo.closest( '.no-scroll-wrap' )
		) {
			return false;
		}

		return elementToScrollTo;
	};

	app.scrollToHash = function ( hash, evt ) {
		const elementToScrollTo =
			typeof hash === 'object' ? hash : app.getHashElement( hash );

		if ( ! elementToScrollTo ) {
			return;
		}

		app.isScrolling = true;

		app.scrollTo =
			elementToScrollTo.getBoundingClientRect().top - app.offset;

		const event = new Event( 'hash_link_scroll_offset.scroll_to' );
		app.htmlAndBody.forEach( function ( el ) {
			el.dispatchEvent( event );
		} );

		app.scroll( app.scrollTo );

		if ( evt && evt.preventDefault ) {
			evt.preventDefault();
			window.location.hash = app.hash;
		}
	};

	app.scroll = function ( scrollTo ) {
		window.scrollTo( {
			top: scrollTo,
			behavior: 'smooth',
		} );
		app.initialScroll = app.isScrolling = false;
		const event = new Event( 'hash_link_scroll_offset.complete' );

		app.htmlAndBody.forEach( function ( el ) {
			el.dispatchEvent( event );
		} );
	};

	app.init();

	return app;
} )( window, document, window.Hash_Link_Scroll_Offset );
