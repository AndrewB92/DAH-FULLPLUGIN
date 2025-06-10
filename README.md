# DAH Next App WordPress Plugin

This repository contains the original Next.js project under `dah-booking-main`
and a WordPress plugin (`dah-next-plugin`) that exposes the app via shortcodes.

1. Build the Next.js project:
   ```bash
   cd dah-booking-main
   npm install
   NEXT_PUBLIC_CLIENT_ID=<client_id> NEXT_PUBLIC_CLIENT_SECRET=<client_secret> npx next build && npx next export -o ../dah-next-plugin/build
   ```
   Replace `<client_id>` and `<client_secret>` with your credentials.

2. Copy the exported files into `dah-next-plugin/build`.
3. Install the plugin in WordPress and use the shortcodes on the relevant pages:
   - `[dah_booking_calendar]`
   - `[dah_prepayment_page]`
   - `[dah_payment_page]`
