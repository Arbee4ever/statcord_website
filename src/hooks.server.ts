import { dev } from '$app/environment';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve, cookies }) {
	event.setHeaders({ 'Cache-Control': 'no-store' });
	const access_token = event.cookies.get('disco_access_token') || '';
	const refresh_token = event.cookies.get('disco_refresh_token') || '';
	event.locals.disco_access_token = access_token;
	event.locals.disco_refresh_token = refresh_token;

	if (refresh_token && !access_token) {
		const discord_request = await fetch(event.url.origin + '/api/refresh?code=' + refresh_token);
		if (discord_request.status !== 200) {
			return await resolve(event);
		}
		const response = await discord_request.json();

		event.locals.disco_access_token = response.disco_access_token;
		event.locals.disco_refresh_token = response.disco_refresh_token;

		const access_token_expires_in = new Date(Date.now() + response.expires_in); // 10 minutes
		const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

		cookies.set('disco_access_token', response.access_token, {
			secure: !dev,
			httpOnly: true,
			path: '/',
			expires: access_token_expires_in
		});
		cookies.set('disco_refresh_token', response.refresh_token, {
			secure: !dev,
			httpOnly: true,
			path: '/',
			expires: refresh_token_expires_in
		});
	}
	return await resolve(event);
}
