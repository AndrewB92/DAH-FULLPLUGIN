<?php
/*
Plugin Name: DAH Next.js Booking
Description: Integrates the DAH Next.js booking application via shortcodes.
Version: 0.1.0
Author: Codex
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function dah_next_enqueue_scripts() {
    $build_url  = plugin_dir_url(__FILE__) . 'build/';
    $build_path = plugin_dir_path(__FILE__) . 'build/app.js';

    if (file_exists($build_path)) {
        // Main JS bundle from the exported Next.js app
        wp_register_script('dah-next-app', $build_url . 'app.js', array(), null, true);
    }
}
add_action('wp_enqueue_scripts', 'dah_next_enqueue_scripts');

function dah_next_calendar_shortcode($atts = array()) {
    wp_enqueue_script('dah-next-app');
    return '<div id="dah-booking-calendar"></div>';
}
add_shortcode('dah_booking_calendar', 'dah_next_calendar_shortcode');

function dah_next_prepayment_shortcode($atts = array()) {
    wp_enqueue_script('dah-next-app');
    return '<div id="dah-prepayment"></div>';
}
add_shortcode('dah_prepayment_page', 'dah_next_prepayment_shortcode');

function dah_next_payment_shortcode($atts = array()) {
    wp_enqueue_script('dah-next-app');
    return '<div id="dah-payment"></div>';
}
add_shortcode('dah_payment_page', 'dah_next_payment_shortcode');

?>
