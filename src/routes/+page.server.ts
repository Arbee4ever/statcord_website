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
            return getData(disco_access_token);
        }
    }

    if (disco_access_token) {
        return getData(disco_access_token);
    }
}

async function getData(token: any) {
    const userReq = fetch(`https://discordapp.com/api/users/@me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const guildReq = fetch(`https://discordapp.com/api/users/@me/guilds`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const promise = await Promise.all([userReq, guildReq]).then(async (values) => {
        const userResp = await values[0].json();
        const guildResp = await values[1].json();
        if (userResp.id) {
            const jsonResponse = [];
            for (let i = 0; i < guildResp.length; i++) {
                const element = guildResp[i];
                if ((element.permissions & (1 << 5)) != 0) {
                    const jsonElement = {
                        "id": element.id,
                        "name": element.name,
                        "icon": element.icon
                    };
                    jsonResponse.push(jsonElement);
                }
            }
            return {
                user: {
                    ...userResp
                },
                userAdminGuilds: jsonResponse
            }
        }

        return {
            user: false,
            userAdminGuilds: false
        }
    });
    
    const resp = JSON.parse(JSON.stringify({
        user: { ...promise.user },
        userAdminGuilds: promise.userAdminGuilds
    }))
    return resp;
}