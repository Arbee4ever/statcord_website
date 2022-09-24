import { DISCORD_AUTH } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }: any) {

    const guildsReq = await fetch('https://discordapp.com/api/users/@me/guilds', {
        method: 'GET',
        headers: {
            Authorization: 'Bot ' + DISCORD_AUTH
        }
    });

    const guildsResp = await guildsReq.json();

    const jsonElement = [
        ...guildsResp
    ];

    return new Response(
        JSON.stringify(jsonElement), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
        }
    });
}