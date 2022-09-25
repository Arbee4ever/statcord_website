import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const guildsReq = await fetch('https://discordapp.com/api/users/@me/guilds', {
        method: 'GET',
        headers: {
            Authorization: 'Bot ' + env.DISCORD_AUTH
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