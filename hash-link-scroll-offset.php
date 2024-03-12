<?php // phpcs:ignore WordPress.Files.FileName.InvalidClassFileName
/**
 * Plugin Name: Hash Link Scroll Offset
 * Plugin URI:  http://webdevstudios.com
 * Description: Offset the scroll position of anchored links. Handy if you have a sticky header that covers linked material.
 * Version:     0.3.0
 * Author:      WebDevStudios
 * Author URI:  http://webdevstudios.com
 * Donate link: http://webdevstudios.com
 * License:     GPLv2+
 * Text Domain: hash_link_scroll_offset
 * Domain Path: /languages
 * GitHub Plugin URI: https://github.com/WebDevStudios/Hash-Link-Scroll-Offset
 * GitHub Branch: master
 */

/**
 * Copyright (c) 2014 WebDevStudios (email : contact@webdevstudios.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

/**
 * Class Hash_Link_Scroll_Offset.
 */
class Hash_Link_Scroll_Offset {

	const VERSION = '0.3.0';

	/**
	 * Plugin URL.
	 *
	 * @since 0.1.0
	 * @var string
	 */
	public static $url = '';

	/**
	 * Plugin path.
	 *
	 * @since 0.1.0
	 * @var string
	 */
	public static $path = '';

	/**
	 * Plugin name.
	 *
	 * @since 0.1.0
	 * @var string|void
	 */
	public static $name = '';

	/**
	 * Sets up our plugin
	 *
	 * @since 0.1.0
	 */
	public function __construct() {
		// Useful variables.
		self::$url  = trailingslashit( plugin_dir_url( __FILE__ ) );
		self::$path = trailingslashit( __DIR__ );
		self::$name = __( 'Hash Link Scroll Offset', 'hash_link_scroll_offset' );
	}

	/**
	 * Add our hooks.
	 *
	 * @since 0.1.0
	 */
	public function hooks() {
		register_activation_hook( __FILE__, [ $this, 'activate' ] );
		add_action( 'init', [ $this, 'init' ] );
		add_filter( 'admin_init', [ $this, 'admin_hooks' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_js' ] );
	}

	/**
	 * Init hooks.
	 *
	 * @since 0.1.0
	 */
	public function init() {
		$locale = apply_filters( 'plugin_locale', get_locale(), 'hash_link_scroll_offset' );
		load_textdomain( 'hash_link_scroll_offset', WP_LANG_DIR . '/hash_link_scroll_offset/hash_link_scroll_offset-' . $locale . '.mo' );
		load_plugin_textdomain( 'hash_link_scroll_offset', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		add_action( 'all_admin_notices', [ $this, 'admin_notice_activated' ] );
	}

	/**
	 * Activate the plugin.
	 *
	 * @since 0.1.0
	 */
	public function activate() {
		if ( ! get_option( 'hash_link_scroll_offset' ) ) {
			update_option( 'hash_link_scroll_offset', 0 );
		}
		add_option( 'hash_link_scroll_offset_msg', 1, '', 'no' );
	}

	/**
	 * Admin notice for when activated.
	 *
	 * @since 0.1.0
	 */
	public function admin_notice_activated() {
		if ( ! get_option( 'hash_link_scroll_offset_msg' ) ) {
			return;
		}
		delete_option( 'hash_link_scroll_offset_msg' );
		// translators: %s is the name of the plugin.
		$settings_link = sprintf( '<a href="%s">%s</a>', $this->settings_url(), sprintf( __( 'update the "%s" setting', 'hash_link_scroll_offset' ), self::$name ) );

		echo wp_kses_post(
			'<div id="message" class="updated">
				<p>' . /* translators: %1$s is the name of the plugin, %2$s is a link to the settings page. */ sprintf( __( 'The "%1$s" plugin has been activated. Please %2$s.', 'hash_link_scroll_offset' ), self::$name, $settings_link ) . '</p>
			</div>'
		);
	}

	/**
	 * Hooks to run on admin_init.
	 *
	 * @since 0.1.0
	 */
	public function admin_hooks() {
		add_filter(
			'plugin_action_links_' . plugin_basename( plugin_dir_path( __FILE__ ) . 'hash-link-scroll-offset.php' ),
			[ $this, 'settings_link' ]
		);

		register_setting( 'general', 'hash_link_scroll_offset', 'absint' );

		$class = isset( $_GET['hash_link_scroll_offset'] ) ? ' highlighted' : '';
		add_settings_field(
			'hash_link_scroll_offset',
			'<label for="hash_link_scroll_offset" class="hash_link_scroll_offset_setting_label' . $class . '">' . self::$name . '</label>',
			[ $this, 'fields_html' ],
			'general'
		);
	}

	/**
	 * Returns our HTML settings link.
	 *
	 * @since 0.1.0
	 *
	 * @param array $links Array of links for settings area.
	 * @return mixed
	 */
	public function settings_link( $links ) {
		$setting_link = sprintf( '<a href="%s">%s</a>', $this->settings_url(), __( 'Change Offset Setting', 'hash_link_scroll_offset' ) );
		array_unshift( $links, $setting_link );

		return $links;
	}

	/**
	 * Return our fields HTML.
	 *
	 * @since 0.1.0
	 */
	public function fields_html() {
		$class = isset( $_GET['hash_link_scroll_offset'] ) ? ' highlighted' : '';

		if ( $class ) : ?>
		<style>
			.hash_link_scroll_offset_setting_label.highlighted,
			.hash_link_scroll_offset_setting_wrap.highlighted {
				background: #ffbebe;
				outline: #ffbebe 5px solid;
				display: block;
			}
			.hash_link_scroll_offset_setting_label.highlighted {
				display: block;
				outline: #ffbebe 8px solid;
			}
		</style>
		<?php endif; ?>
		<div class="hash_link_scroll_offset_setting_wrap<?php echo esc_attr( $class ); ?>">
			<input class="small-text" placeholder="50" type="number" step="1" min="1" id="hash_link_scroll_offset" name="hash_link_scroll_offset" value="<?php echo esc_attr( get_option( 'hash_link_scroll_offset', 0 ) ); ?>"> <?php esc_html_e( 'pixels', 'hash_link_scroll_offset' ); ?>
		</div>
		<p class="description"><?php esc_html_e( 'When the Admin Bar is displayed in your theme, this value is automatically increased by 32px.', 'hash_link_scroll_offset' ); ?></p>
		<?php
	}

	/**
	 * Enqueue our JS.
	 *
	 * @since 0.1.0
	 */
	public function enqueue_js() {
		$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		// Automatically load imported dependencies and assets version.
		$asset_file = require plugin_dir_path( __FILE__ ) . 'assets/js/hash-link-scroll-offset.min.asset.php';

		wp_register_script(
			'hash_link_scroll_offset',
			plugins_url( "assets/js/hash-link-scroll-offset$min.js", __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_enqueue_script( 'hash_link_scroll_offset' );
		wp_add_inline_script( 'hash_link_scroll_offset', 'const hlsOffset = ' . wp_json_encode( [ 'offset' => get_option( 'hash_link_scroll_offset', 0 ) ] ) . ';', 'before' );
	}

	/**
	 * Return our admin settings URL.
	 *
	 * @since 0.1.0
	 *
	 * @return string|void
	 */
	public function settings_url() {
		return admin_url( 'options-general.php?hash_link_scroll_offset' );
	}
}

// Init our class.
$hash_link_scroll_offset = new Hash_Link_Scroll_Offset();
$hash_link_scroll_offset->hooks();
