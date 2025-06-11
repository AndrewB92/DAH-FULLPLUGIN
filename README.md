# DAH Next App WordPress Plugin

The `dah-next-plugin` directory contains a WordPress plugin that bundles a
Next.js application. The Next.js source lives inside
`dah-next-plugin/nextjs-app/src` and can be compiled directly into the plugin's
`build` folder.

## Building the Next.js app

The build relies on several environment variables so that API keys and tokens
are baked into the static output. Set them before running the build:

- `GUESTY_CLIENT_ID` / `GUESTY_CLIENT_SECRET` – OAuth credentials used by
  `tokenManager.js` to fetch a Guesty Open API token.
- `GUESTY_AUTH` – String sent to our booking token endpoint.
- `GUESTY_CREDENTIAL` – Username and password for Guesty API requests that use
  basic authentication.
- `NEXT_PUBLIC_API_URL` – Base URL for calling the plugin’s API routes on the
  client.
- `NEXT_PUBLIC_NEW_GOOGLE_MAP_KEY` and `GOOGLE_MAP_KEY` – Google Maps API keys
  used on the client and server respectively.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` – Stripe keys used
  to create and display payment intents.
- `SENDGRID_API_KEY` and `RESEND_API_KEY` – Email service credentials for the
  API routes.
- `API_ACCESS_KEY` – Secret required by `/api/guesty/token/open`.
- `PROXY` – Optional proxy prefix for calendar requests.

```bash
cd dah-next-plugin/nextjs-app/src
npm install
GUESTY_CLIENT_ID=<id> \
GUESTY_CLIENT_SECRET=<secret> \
GUESTY_AUTH=<booking_auth> \
GUESTY_CREDENTIAL=<user:pass> \
NEXT_PUBLIC_API_URL=<url> \
NEXT_PUBLIC_NEW_GOOGLE_MAP_KEY=<maps_key> \
GOOGLE_MAP_KEY=<server_maps_key> \
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<stripe_pub> \
STRIPE_SECRET_KEY=<stripe_secret> \
SENDGRID_API_KEY=<sendgrid_key> \
RESEND_API_KEY=<resend_key> \
API_ACCESS_KEY=<internal_key> \
PROXY=<proxy_url> \
npx next build && npx next export -o ../build
```

The exported files will be written to `dah-next-plugin/build`.

## Installing the plugin

Copy the entire `dah-next-plugin` directory into your WordPress installation's
`wp-content/plugins` folder and activate it. Use the following shortcodes on any
page to embed the booking application:

- `[dah_booking_calendar]`
- `[dah_prepayment_page]`
- `[dah_payment_page]`
