import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "statcord-leaderboard-nqzqn" });
const credentials = Realm.Credentials.anonymous();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
    const user = await app.logIn(credentials);
    const mongo = user.mongoClient("mongodb-atlas");
    const collection = mongo.db("Guilds").collection(params.serverId);
    let jsonResponse = [];
    if (params.serverId.length != 19) {
        throw error(400, "Invalid Guild ID: " + params.serverId);
    }
    let data = await collection.find()
    data.sort((a, b) => {
        return b.score - a.score;
    });
    for (const element of data) {
        const discordData = await getDiscordData(element.id);
        const discordDataJson = await discordData.json();
        let jsonElement = {
            "pos": data.indexOf(element) + 1,
            "id": element.id,
            "name": discordDataJson.username + "#" + discordDataJson.discriminator,
            "pfp": "https://cdn.discordapp.com/avatars/" + element.id + "/" + discordDataJson.avatar,
            "score": element.score
        };
        jsonResponse.push(jsonElement);
    };
    jsonResponse.sort((a, b) => {
        return b.score - a.score;
    });
    if (url.searchParams.has("userId")) {
        let userId = url.searchParams.get("userId");
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
async function getDiscordData(id) {
    return await fetch('https://discord.com/api/users/' + id, {
        method: 'GET',
        headers: {
            "Authorization": "Bot " +  env.DISCORD_AUTH
        }
    });
}