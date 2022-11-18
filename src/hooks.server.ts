import { dev } from '$app/environment';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.setHeaders({ 'Cache-Control': 'no-store' });
    const access_token = event.cookies.get('disco_access_token') || '';
    const refresh_token = event.cookies.get('disco_refresh_token') || '';
    event.locals.disco_access_token = access_token;
    event.locals.disco_refresh_token = refresh_token;

    if (refresh_token && !access_token) {
        const discord_request = await fetch(event.url.origin + "/api/refresh?code=" + refresh_token);
        if (discord_request.status !== 200) {
            return await resolve(event);
        }
        const discord_response = await discord_request.json();

        event.locals.disco_access_token = discord_response.disco_access_token;
        event.locals.disco_refresh_token = discord_response.disco_refresh_token;

        const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        if (discord_response.disco_access_token) {
            event.cookies.set('disco_access_token', discord_response.disco_access_token, {
                secure: !dev,
                httpOnly: true,
                path: '/',
                expires: discord_response.access_token_expires_in
            });
            event.cookies.set('disco_refresh_token', discord_response.disco_refresh_token, {
                secure: !dev,
                httpOnly: true,
                path: '/',
                expires: refresh_token_expires_in
            });
        }
    }
    return await resolve(event);
}