export async function fetchBookingToken() {

    let token;
    const data = {
        authdata: process.env.GUESTY_AUTH
    };

    // console.log('Sending Auth Data:', data);  // Log the data to be sent

    try {
        const response = await fetch('https://ckghosting.com/guesty/booking_token_json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const tokenArray = await response.json();
        // console.log('Full API Response:', tokenArray);

        if (response.ok && tokenArray.token) {
            token = tokenArray.token.data[0].booking_token
            // console.log('Fetched booking token:', token);
        } else {
            console.error('api error: 25')
            // console.error('Invalid token response structure', tokenArray);
        }

    } catch (error) {
        console.error('api error: 30')
        // console.error('Error fetching booking token:', error);
    }

    // console.log(token)

    return token;
}

export async function fetchOpenApiToken() {
    let token;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'open-api');
    params.append('client_id', process.env.GUESTY_CLIENT_ID);
    params.append('client_secret', process.env.GUESTY_CLIENT_SECRET);

    try {
        const response = await fetch('https://open-api.guesty.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        const data = await response.json();
        if (response.ok && data.access_token) {
            token = data.access_token;
        } else {
            console.error('api error: open-api token', data);
        }
    } catch (error) {
        console.error('api error: open-api token fetch', error);
    }
    return token;
}