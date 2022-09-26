import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const disco_refresh_token = event.cookies.get("disco_refresh_token");
    const disco_access_token = event.cookies.get("disco_access_token");

    if (disco_refresh_token && !disco_access_token) {
        const discord_request = await fetch(env.HOST + '/api/refresh?code=' + disco_refresh_token)
        const discord_response = await discord_request.json();

        if (discord_response.disco_access_token) {
            event.cookies.set(`disco_access_token=${discord_response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${discord_response.access_token_expires_in}}`)
            event.cookies.set(`disco_refresh_token=${discord_response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${discord_response.refresh_token_expires_in}`)

            const request = await fetch(`https://discordapp.com/api/users/@me`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            });

            const guildReq = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            });

            // returns a discord user if JWT was valid
            const response = await request.json();
            const guildResp = await guildReq.json();

            if (response.id) {
                const jsonResponse = [];
                for (let i = 0; i < guildResp.length; i++) {
                    const element = guildResp[i];
                    if ((element.permissions & (1 << 5)) != 0) {
                        const jsonElement = {
                            "statcord": await checkGuild(element.id),
                            "id": element.id,
                            "name": element.name,
                            "icon": element.icon
                        };
                        jsonResponse.push(jsonElement);
                    }
                }
                return {
                    user: {
                        ...response
                    },
                    userGuilds: jsonResponse
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
            const jsonResponse = [];
            for (let i = 0; i < guildResp.length; i++) {
                const element = guildResp[i];
                if ((element.permissions & (1 << 5)) != 0) {
                    const jsonElement = {
                        "statcord": await checkGuild(element.id),
                        "id": element.id,
                        "name": element.name,
                        "icon": element.icon
                    };
                    jsonResponse.push(jsonElement);
                }
            }
            return {
                user: {
                    ...response
                },
                userGuilds: jsonResponse
            }
        }
    }

    return {
        user: false
    }
}

async function checkGuild(id) {
    const req = await fetch(env.HOST + '/api/guilds/' + id, {
        method: 'GET'
    });
    return req.status;
}