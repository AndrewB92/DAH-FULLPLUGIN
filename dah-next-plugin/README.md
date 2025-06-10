# DAH Next.js Booking Plugin

This WordPress plugin embeds the compiled Next.js booking application using shortcodes.

Place the exported files from the `dah-booking-main` project in the `build` directory.
The directory is included with a `.gitkeep` file so it can be committed empty.

## Shortcodes
- `[dah_booking_calendar]` – Renders the calendar component.
- `[dah_prepayment_page]` – Shows the prepayment screen.
- `[dah_payment_page]` – Shows the payment screen.

Each shortcode enqueues `build/app.js`, which must be produced by running `next build` followed by `next export`.

