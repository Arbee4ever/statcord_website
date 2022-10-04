import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    let user = null
    let token = "";

    if (cookies.get('disco_access_token') && cookies.get('disco_refresh_token')) {
        const userReq = await fetch(`https://discordapp.com/api/users/@me`, {
            headers: { 'Authorization': `Bearer ${cookies.get('disco_access_token')}` }
        });

        if (userReq.status !== 200) {
            throw error(userReq.status, userReq.statusText)
        }

        user = await userReq.json();
        token = cookies.get('disco_access_token');
    }
    return {
        user,
        token
    }
}