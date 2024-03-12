=== Hash Link Scroll Offset ===
Contributors:      webdevstudios, pluginize
Donate link:       http://webdevstudios.com
Tags:
Requires at least: 5.5
Tested up to:      6.5.0
Stable tag:        0.3.0
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

Offset the scroll position of anchored links. Handy if you have a sticky header that covers linked material.

== Description ==

Often anchor links can be overachievers and can scroll a user past the section intended. This plugin attempts to change that by offering a setting that allows you to change the scroll offset when clicking anchors. It also adds a nice animated scrolling effect when clicking an anchor rather than the sudden jump that usually occurs. Even handles when visiting a hashed URL directly.

Use the `no-scroll` class on any hash links that are not meant to scroll to an area of the page (Navigation for sliders, etc).

[Pluginize](https://pluginize.com/?utm_source=hash-link-scroll&utm_medium=text&utm_campaign=wporg) was launched in 2016 by [WebDevStudios](https://webdevstudios.com/) to promote, support, and house all of their [WordPress products](https://pluginize.com/shop/?utm_source=hash-link-scroll&utm_medium=text&utm_campaign=wporg). Pluginize is not only creating new products for WordPress all the time, but also provides [ongoing support and development for WordPress community favorites like CPTUI](https://wordpress.org/plugins/custom-post-type-ui/), [CMB2](https://wordpress.org/plugins/cmb2/), and more.

== Installation ==

= Manual Installation =

1. Upload the entire `/hash-link-scroll-offset` directory to the `/wp-content/plugins/` directory.
2. Activate Hash Link Scroll Offset through the 'Plugins' menu in WordPress.
3. Update the "Hash Link Scroll Offset" setting on the general settings page, **http://YOURSITE.COM/wp-admin/options-general.php**.

== Frequently Asked Questions ==


== Screenshots ==


== Changelog ==

= 0.3.0 =
* Updated: Removed jQuery dependency in our javascript
* Updated: Escaping and sanitizing of output.

= 0.2.2 =
* Confirmed compatibility with WordPress 6.4

= 0.2.1 =
* Confirmed compatibility with WordPress 6.3

= 0.2.0 =
* Misc changes
* Tested up to WordPress 5.9 *

= 0.1.8 =
* Adjust JS to account for relative urls.
* Add checks for evt and event.preventDefault existing.

= 0.1.7 =
* Refactor JS to be more extensible, and adjust auto-scrolling (when hash exists in URL) to be more intelligent.

= 0.1.6 =
* `'hash_link_scroll_offset.scroll_to'` jQuery event fired befor scrolling is initated. Also introduce useful properties, `scrollTo`, `initialScroll`, and `isScrolling`;

= 0.1.5 =
* `'hash_link_scroll_offset.complete'` jQuery event fired when scrolling complete.

= 0.1.4 =
* Fix "Cannot use a scalar value as an array" debug warning. ([Relevant Trac ticket](https://core.trac.wordpress.org/ticket/29722#comment:8))

= 0.1.3 =
* Prevent browser windows from moving/blinking on initial click of anchor link. Props [@ImBigWill](https://github.com/WebDevStudios/Hash-Link-Scroll-Offset/pull/9).

= 0.1.2 =
* Automatically compensate for admin bar. Props [@salcode](https://github.com/WebDevStudios/Hash-Link-Scroll-Offset/pull/5).

= 0.1.1 =
* Add `no-scroll` class exception. Props [@billerickson](https://github.com/billerickson)

= 0.1.0 =
* First release

== Upgrade Notice ==

= 0.2.0 =
* Misc changes
* Tested up to WordPress 5.9 *

= 0.1.8 =
* Adjust JS to account for relative urls.
* Add checks for evt and event.preventDefault existing.

= 0.1.7 =
* Refactor JS to be more extensible, and adjust auto-scrolling (when hash exists in URL) to be more intelligent.

= 0.1.6 =
* `'hash_link_scroll_offset.scroll_to'` jQuery event fired befor scrolling is initated. Also introduce useful properties, `scrollTo`, `initialScroll`, and `isScrolling`;

= 0.1.5 =
* `'hash_link_scroll_offset.complete'` jQuery event fired when scrolling complete.

= 0.1.4 =
* Fix "Cannot use a scalar value as an array" debug warning. ([Relevant Trac ticket](https://core.trac.wordpress.org/ticket/29722#comment:8))

= 0.1.3 =
* Prevent browser windows from moving/blinking on initial click of anchor link. Props [@ImBigWill](https://github.com/WebDevStudios/Hash-Link-Scroll-Offset/pull/9).

= 0.1.2 =
* Automatically compensate for admin bar. Props [@salcode](https://github.com/WebDevStudios/Hash-Link-Scroll-Offset/pull/5).

= 0.1.1 =
* Add `no-scroll` class exception. Props [@billerickson](https://github.com/billerickson)

= 0.1.0 =
First Release
