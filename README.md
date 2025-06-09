# DAH Next App WordPress Plugin

This plugin provides WordPress shortcodes that embed the existing Next.js booking application via iframes. Configure the base URL of the deployed Next.js app and place the shortcodes on any page.

## Installation
1. Copy the contents of this repository into `wp-content/plugins/dah-next-app` on your WordPress site.
2. Activate the **DAH Next App Shortcodes** plugin from the WordPress admin.
3. Navigate to **Settings → DAH Next App** and set the **App Base URL** (the URL where the built Next.js app is hosted).

## Shortcodes
- `[dah_calendar]` – displays the calendar page from the Next.js app.
- `[dah_prepayment]` – shows the prepayment page.
- `[dah_payment]` – shows the payment page.

Each shortcode renders the corresponding page inside an `<iframe>`. Ensure the base URL is reachable from your WordPress site.

## Notes
This repository does not include the Next.js source. Build and deploy the application separately (for example on Vercel) and reference its URL in the plugin settings.
