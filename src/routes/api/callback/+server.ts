import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (query) => {
    const returnCode = query.url.searchParams.get("code");

    if (returnCode == null) {
        return error(400, "Invalid return Code");
    }

    const dataObject = {
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
        redirect_uri: env.DISCORD_REDIRECT_URI,
        grant_type: 'authorization_code',
        scope: 'identify guilds',
        code: returnCode
    };

    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const response = await request.json();

    if (response.error) {
        return new Response("", {
            headers: { Location: '/' },
            status: 302
        })
    }

    const access_token_expires_in = new Date(Date.now() + response.expires_in);
    const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return new Response("", {
        headers: new Headers([
            ['Set-Cookie', `disco_access_token=${response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${access_token_expires_in}}`],
            ['Set-Cookie', `disco_refresh_token=${response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${refresh_token_expires_in}`],
            ['Location', '/']
        ]),
        status: 301
    });
}