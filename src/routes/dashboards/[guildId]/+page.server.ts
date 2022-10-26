import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params }) {
    const userReq = await fetch(`https://discordapp.com/api/users/@me`, {
        headers: { 'Authorization': `Bearer ${cookies.get('disco_access_token')}` }
    });
    if (userReq.status != 200) {
        throw redirect(302, "/api/signout");
    }

    if (userReq.status != 200) {
        throw error(userReq.status, userReq.statusText)
    }

    const user = await userReq.json();

    const guildReq = await fetch('https://api.statcord.arbeeco.de/guilds/' + params.guildId + "?user=" + user.id);
    if (guildReq.status != 200) {
        throw redirect(302, "/");
    }
    const guildResp = await guildReq.json();
    if (!guildResp.moderator) {
        throw redirect(302, "/");
    }

    const configReq = await fetch('https://api.statcord.arbeeco.de/guilds/' + params.guildId + "/config");
    if (configReq.status != 200) {
        throw redirect(302, "/");
    }
    const configResp = configReq.json();

    return {
        user: user,
        config: configResp
    }
}