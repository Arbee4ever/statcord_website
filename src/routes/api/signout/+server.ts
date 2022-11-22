import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ( {cookies} ) => {
	cookies.delete("disco_access_token", {
		path: '/',
		secure: !dev
	})
	cookies.delete("disco_refresh_token", {
		path: '/',
		secure: !dev
	});
	throw redirect(302, '/')
};
