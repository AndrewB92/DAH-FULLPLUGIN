# DAH Next App WordPress Plugin

The `dah-next-plugin` directory contains a WordPress plugin that bundles a
Next.js application. The Next.js source lives inside
`dah-next-plugin/nextjs-app/src` and can be compiled directly into the plugin's
`build` folder.

## Building the Next.js app

```bash
cd dah-next-plugin/nextjs-app/src
npm install
NEXT_PUBLIC_CLIENT_ID=<client_id> \
NEXT_PUBLIC_CLIENT_SECRET=<client_secret> \
npx next build && npx next export -o ../build
```

The Next.js configuration now sets `assetPrefix` and `basePath` to
`/wp-content/plugins/dah-next-plugin/build` so that the exported HTML loads its
scripts and assets from the plugin directory.

Replace `<client_id>` and `<client_secret>` with your credentials. The exported
files will be written to `dah-next-plugin/build`.

## Installing the plugin

Copy the entire `dah-next-plugin` directory into your WordPress installation's
`wp-content/plugins` folder and activate it. Use the following shortcodes on any
page to embed the booking application:

- `[dah_booking_calendar]`
- `[dah_prepayment_page]`
- `[dah_payment_page]`
