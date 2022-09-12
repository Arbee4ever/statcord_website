import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { MongoClient } from "mongodb";
const client = new MongoClient(env.MONGODB_CONNECTION_STRING);

/** @type {import('../../../../../.svelte-kit/types/src/routes/api/guild/[serverId]/$types').RequestHandler} */
export async function GET({ params, url }) {
    const collection = client.db("Guilds").collection(params.serverId);
    const skip = url.searchParams.get("index") ?? 0;
    let jsonResponse = [];
    if (params.serverId.length != 19) {
        throw error(400, "Invalid Guild ID: " + params.serverId);
    }
    const data = await collection.find().sort( { score: -1 } ).limit(10).skip(skip).toArray();
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const discordData = await getDiscordData(element.id);
        const discordDataJson = await discordData.json();
        const jsonElement = {
            "pos": i + 1,
            "id": discordDataJson.id,
            "name": discordDataJson.username + "#" + discordDataJson.discriminator,
            "pfp": "https://cdn.discordapp.com/avatars/" + element.id + "/" + discordDataJson.avatar,
            "score": element.score
        };
        jsonResponse.push(jsonElement);
    }
    if (url.searchParams.has("userId")) {
        const userId = url.searchParams.get("userId");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (userId.length > 18 || userId.length < 17) {
            throw error(400, "Invalid User ID: " + userId);
        }
        jsonResponse = jsonResponse.filter((i) => {
            return i.id === userId;
        })
    }
    if (jsonResponse.length == 0) {
        throw error(400, "Malformed url")
    }
    return new Response(
        JSON.stringify(jsonResponse), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
        }
    });
}

/**
 * @param {string} id
 */
async function getDiscordData(id: string) {
    return await fetch('https://discord.com/api/users/' + id, {
        method: 'GET',
        headers: {
            "Authorization": "Bot " +  env.DISCORD_AUTH
        }
    });
}