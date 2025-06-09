<?php
/**
 * Plugin Name: DAH Next App Shortcodes
 * Description: Provides shortcodes to embed the existing Next.js booking application via iframes.
 * Version: 0.1.0
 * Author: Codex
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Activation hook to set default options.
 */
function dah_next_activate() {
    add_option( 'dah_next_base_url', '' );
}
register_activation_hook( __FILE__, 'dah_next_activate' );

/**
 * Add settings page under Settings menu.
 */
function dah_next_add_settings_page() {
    add_options_page(
        'DAH Next App',
        'DAH Next App',
        'manage_options',
        'dah-next-app',
        'dah_next_render_settings_page'
    );
}
add_action( 'admin_menu', 'dah_next_add_settings_page' );

/**
 * Render the settings page.
 */
function dah_next_render_settings_page() {
    if ( isset( $_POST['dah_next_base_url'] ) ) {
        check_admin_referer( 'dah_next_save_settings' );
        update_option( 'dah_next_base_url', esc_url_raw( $_POST['dah_next_base_url'] ) );
        echo '<div class="updated"><p>Settings saved.</p></div>';
    }
    $base_url = esc_url( get_option( 'dah_next_base_url', '' ) );
    ?>
    <div class="wrap">
        <h1>DAH Next App</h1>
        <form method="post">
            <?php wp_nonce_field( 'dah_next_save_settings' ); ?>
            <table class="form-table">
                <tr>
                    <th scope="row"><label for="dah_next_base_url">App Base URL</label></th>
                    <td><input name="dah_next_base_url" id="dah_next_base_url" type="url" value="<?php echo $base_url; ?>" class="regular-text" /></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

/**
 * Helper to build iframe output.
 *
 * @param string $path Path relative to the app base URL.
 * @return string
 */
function dah_next_iframe( $path ) {
    $base_url = rtrim( get_option( 'dah_next_base_url', '' ), '/' );
    if ( empty( $base_url ) ) {
        return '<p>The DAH Next App base URL is not configured.</p>';
    }
    $src = esc_url( $base_url . '/' . ltrim( $path, '/' ) );
    $style = 'width:100%;min-height:800px;border:0;';
    return '<iframe src="' . $src . '" style="' . $style . '"></iframe>';
}

/**
 * Shortcodes.
 */
function dah_next_calendar_shortcode() {
    return dah_next_iframe( 'calendar' );
}
add_shortcode( 'dah_calendar', 'dah_next_calendar_shortcode' );

function dah_next_prepayment_shortcode() {
    return dah_next_iframe( 'prepayment' );
}
add_shortcode( 'dah_prepayment', 'dah_next_prepayment_shortcode' );

function dah_next_payment_shortcode() {
    return dah_next_iframe( 'payment' );
}
add_shortcode( 'dah_payment', 'dah_next_payment_shortcode' );
?>
