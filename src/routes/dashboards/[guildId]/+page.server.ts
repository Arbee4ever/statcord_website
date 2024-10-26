import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	throw redirect(302, `/dashboards/${params.guildId}/values`);
}