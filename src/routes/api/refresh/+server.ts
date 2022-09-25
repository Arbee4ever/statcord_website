import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const disco_refresh_token = url.searchParams.get('code');
    if (!disco_refresh_token) {
        return new Response("", {
            body: JSON.stringify({ error: 'No refresh token found' }),
            status: 500
        })
    }

    const dataObject = {
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: disco_refresh_token
    };

    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const response = await request.json();

    if (response.error) {
        console.log(response.error)
        return new Response("", {
            body: JSON.stringify({ error: response.error }),
            status: 500
        })
    }

    const access_token_expires_in = new Date(Date.now() + response.expires_in);
    const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    console.log(response)
    return new Response("", {
        headers: {
            'set-cookie': [
                `disco_access_token=${response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${access_token_expires_in}}`,
                `disco_refresh_token=${response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${refresh_token_expires_in}`,
            ]
        },
        status: 200,
        body: JSON.stringify({ disco_access_token: response.access_token })
    })
}