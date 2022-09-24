import { HOST } from "$env/static/private";

/** @type {import('./$types').LayoutServerLoad} */
export async function load(request) {
    const disco_refresh_token = request.cookies.get("disco_refresh_token");
    const disco_access_token = request.cookies.get("disco_access_token");

    if (disco_refresh_token && !disco_access_token) {
        const discord_request = await fetch(`${HOST}/api/refresh?code=${disco_refresh_token}`);
        const discord_response = await discord_request.json();

        if (discord_response.disco_access_token) {
            const request = await fetch(`https://discordapp.com/api/users/@me`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            });

            const guildReq = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            });

            const response = await request.json();
            const guildResp = await guildReq.json();

            if (response.id) {
                return {
                    user: {
                        ...response
                    },
                    userGuilds: [
                        ...guildResp
                    ]
                }
            }
        }
    }

    if (disco_access_token) {
            const request = await fetch(`https://discordapp.com/api/users/@me`, {
                headers: { 'Authorization': `Bearer ${disco_access_token}` }
            });

            const guildReq = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
                headers: { 'Authorization': `Bearer ${disco_access_token}` }
            });

            // returns a discord user if JWT was valid
            const response = await request.json();
            const guildResp = await guildReq.json();

            if (response.id) {
                return {
                    user: {
                        ...response
                    },
                    userGuilds: [
                        ...guildResp
                    ]
                }
            }
    }

    return {
        user: false
    }
}