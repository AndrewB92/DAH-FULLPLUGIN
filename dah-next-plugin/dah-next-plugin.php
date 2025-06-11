<?php
/*
Plugin Name: DAH Next.js Booking
Description: Embeds the exported Next.js booking application via shortcodes.
Version: 0.2.0
Author: Codex
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function dah_next_iframe($page) {
    $src = plugins_url('build/' . $page . '.html', __FILE__);
    return '<iframe src="' . esc_url($src) . '" style="width:100%;height:100vh;border:0;"></iframe>';
}

function dah_next_calendar_shortcode($atts = array()) {
    return dah_next_iframe('index');
}
add_shortcode('dah_booking_calendar', 'dah_next_calendar_shortcode');

function dah_next_prepayment_shortcode($atts = array()) {
    return dah_next_iframe('prepayment');
}
add_shortcode('dah_prepayment_page', 'dah_next_prepayment_shortcode');

function dah_next_payment_shortcode($atts = array()) {
    return dah_next_iframe('payment');
}
add_shortcode('dah_payment_page', 'dah_next_payment_shortcode');

?>
