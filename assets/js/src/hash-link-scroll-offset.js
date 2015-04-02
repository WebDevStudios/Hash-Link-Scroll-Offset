/**
 * Hash Link Scroll Offset
 * http://webdevstudios.com
 *
 * Copyright (c) 2014 WebDevStudios
 * Licensed under the GPLv2+ license.
 */

/*jslint browser: true */
/*global jQuery:false */

window.Hash_Link_Scroll_Offset = (function(window, document, $, undefined){
	'use strict';

	var app = {};
	app.offset = window.hashLinkOffset || 0;

	app.init = function() {

		// Handle clicking hash links
		$( 'a[href^="#"]:not(.no-scroll)' ).on( 'click', function() {
			app.scrollToHash( this.hash );
		});

		// Handle directly navigating to a hashed URL
		setTimeout( function() {
			if ( window.location.hash ) {
				window.scrollTo( 0, 0 );
				app.scrollToHash( window.location.hash );
			}
		}, 10 );

	};

	app.scrollToHash = function( hash ) {
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

		$('html, body').stop().animate({
			'scrollTop': $element_to_scroll_to.offset().top - app.offset // scroll and offset
		}, 900 );

	};

	$(document).ready( app.init );

	return app;

})(window, document, jQuery);
