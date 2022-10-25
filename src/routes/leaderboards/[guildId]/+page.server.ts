import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    if (cookies.get('disco_access_token') != null) {
        const userReq = await fetch(`https://discordapp.com/api/users/@me`, {
            headers: { 'Authorization': `Bearer ${cookies.get('disco_access_token')}` }
        });

        if (userReq.status != 200) {
            throw error(userReq.status, userReq.statusText)
        }

        const user = await userReq.json();

        return {
            user: user
        }
    }
    return {
        user: null
    }
}