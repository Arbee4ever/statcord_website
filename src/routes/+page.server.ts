import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    let user = null
    let token = "";

    if (locals.disco_access_token && locals.disco_refresh_token) {
        const userReq = await fetch(`https://discordapp.com/api/users/@me`, {
            headers: { 'Authorization': `Bearer ${locals.disco_access_token}` }
        });

        console.log(userReq.statusText)
        if (userReq.status !== 200) {
            throw error(userReq.status, userReq.statusText)
        }

        user = await userReq.json();
        token = locals.disco_access_token;
    }
    return {
        user,
        token
    }
}