import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (query) => {
    const disco_refresh_token = query.url.searchParams.get('code');
    if (!disco_refresh_token) {
        return new Response(JSON.stringify({ error: 'No refresh token found' }), {
            status: 500
        })
    }

    const dataObject = {
        redirect_uri: env.DISCORD_REDIRECT_URI,
        scope: 'identify guilds',
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
        return new Response(JSON.stringify({ error: response.error }), {
            status: 500
        })
    }

    const jsonResp = {
        disco_access_token: response.access_token
    }

    const access_token_expires_in = new Date(Date.now() + response.expires_in);
    const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    console.log(response.access_token)
    console.log(response.refresh_token)
    return new Response(
        JSON.stringify(jsonResp), {
        headers: {
            'set-cookie': [
                `disco_access_token=${response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${access_token_expires_in}}`,
                `disco_refresh_token=${response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${refresh_token_expires_in}`,
            ]
        }
    });
}