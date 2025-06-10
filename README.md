# DAH Next App WordPress Plugin

This repository contains the original Next.js project (`dah-booking-main`) and a WordPress plugin under `dah-next-plugin`.

## Build & Export

1. Navigate to the Next.js project and install dependencies:
   ```bash
   cd dah-booking-main
   npm install
   NEXT_PUBLIC_CLIENT_ID=<client_id> NEXT_PUBLIC_CLIENT_SECRET=<client_secret> npx next build && npx next export -o ../dah-next-plugin/build
   ```
   Replace `<client_id>` and `<client_secret>` with your credentials.

2. The exported files will be placed inside `dah-next-plugin/build`.

## Installing the Plugin

Copy the entire `dah-next-plugin` directory into your WordPress `wp-content/plugins` folder and activate it from the admin panel. Then place the shortcodes on the desired pages:
- `[dah_booking_calendar]`
- `[dah_prepayment_page]`
- `[dah_payment_page]`

