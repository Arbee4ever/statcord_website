import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const discordData = await getDiscordData(params.userId);
    const discordDataJson = await discordData.json();
    const jsonElement = {
        "name": discordDataJson.username + "#" + discordDataJson.discriminator,
        "pfp": discordDataJson.avatar,
    };
    return new Response(
        JSON.stringify(jsonElement), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
        }
    });
}

/**
 * @param {string} id
 */
async function getDiscordData(id) {
    return await fetch('https://discord.com/api/users/' + id, {
        method: 'GET',
        headers: {
            Authorization: 'Bot ' + env.DISCORD_AUTH
        }
    });
}