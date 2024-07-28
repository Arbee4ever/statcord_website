import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('../../../../.svelte-kit/types/src/routes').PageServerLoad} */
export async function load({ cookies }) {
	let user = null;
	const token = cookies.get('disco_access_token');

	if (cookies.get('disco_access_token') && cookies.get('disco_refresh_token')) {
		const userReq = await fetch(`https://discordapp.com/api/users/@me`, {
			headers: { 'Authorization': `Bearer ${token}` }
		});

		if (userReq.status !== 200) {
			throw error(userReq.status, userReq.statusText);
		}

		user = await userReq.json();
		if (user.id != env.ADMIN_ID) {
			throw redirect(302, '/');
		}

		const appReq = await fetch(`https://discord.com/api/applications/@me`, {
			headers: {
				Authorization: env.DISCORD_AUTH
			}
		});

		if (appReq.status !== 200) {
			throw error(appReq.status, appReq.statusText);
		}
		let appResp = await appReq.json();
		let bot = appResp.bot

		return {
			user,
			bot,
			token
		};
	}
	throw redirect(302, '/');
}