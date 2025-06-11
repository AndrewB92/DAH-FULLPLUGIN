# DAH Next.js Booking Plugin

This plugin embeds the compiled Next.js booking application via WordPress shortcodes.

The Next.js source resides in `nextjs-app/src`. Run `next build` and
`next export` there to generate the static files inside the `build` directory.

## Shortcodes
- `[dah_booking_calendar]` – Renders the calendar component.
- `[dah_prepayment_page]` – Shows the prepayment screen.
- `[dah_payment_page]` – Shows the payment screen.

Each shortcode renders the corresponding exported HTML page inside an iframe.
