import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const disco_refresh_token = cookies.get("disco_refresh_token");
    const disco_access_token = cookies.get("disco_access_token");

    if (disco_refresh_token && !disco_access_token) {
        const discord_request = await fetch(env.HOST + '/api/refresh?code=' + disco_refresh_token)
        const discord_response = await discord_request.json();

        if (discord_response.disco_access_token) {
            cookies.set(`disco_access_token=${discord_response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${discord_response.access_token_expires_in}}`)
            cookies.set(`disco_refresh_token=${discord_response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${discord_response.refresh_token_expires_in}`)
            return getData(disco_access_token);
        }
    }

    if (disco_access_token) {
        return getData(disco_access_token);
    }
}

async function getData(token: any) {
    const userReq = await fetch(`https://discordapp.com/api/users/@me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(async (response) => {
        const userResp = await response.json();
        if (userResp.id) {
            return {
                user: {
                    ...userResp
                },
                token: token
            }
        }

        return {
            user: false,
            token: false
        }
    });
    
    const resp = JSON.parse(JSON.stringify({
        user: userReq.user,
        token: userReq.token
    }))
    return resp;
}