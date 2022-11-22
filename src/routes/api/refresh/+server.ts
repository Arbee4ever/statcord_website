import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ( { url }) => {
	const disco_refresh_token = url.searchParams.get('code');
	if (!disco_refresh_token) {
		return new Response(JSON.stringify({ error: 'No refresh token found' }), {
			status: 500
		});
	}

	const dataObject = {
		client_id: env.DISCORD_CLIENT_ID,
		client_secret: env.DISCORD_CLIENT_SECRET,
		redirect_uri: env.DISCORD_REDIRECT_URI,
		refresh_token: disco_refresh_token,
		grant_type: 'refresh_token',
		scope: 'identify guilds'
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
		});
	}

	const jsonResp = {
		disco_access_token: response.access_token,
		disco_refresh_token: response.refresh_token,
        expires_in: response.expires_in
	};

	return new Response(JSON.stringify(jsonResp));
};
