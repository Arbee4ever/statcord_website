import { error } from '@sveltejs/kit';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "statcord-leaderboard-nqzqn" });
const credentials = Realm.Credentials.anonymous();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
    const user = await app.logIn(credentials);
    const mongo = user.mongoClient("mongodb-atlas");
    const collection = mongo.db("Guilds").collection(params.serverId);
    const skip: number = url.searchParams.get("i")*100 ?? 0;
    const userId: number = url.searchParams.get("userId") ?? null;
    let jsonResponse = [];
    if (params.serverId.length != 19) {
        throw error(400, "Invalid Guild ID: " + params.serverId);
    }
    const data = await collection.aggregate([
        {
            $sort: { score: -1}
        },
        {
            $limit: 100
        },
        {
            $skip: Number(skip)
        }
    ]);
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const jsonElement = {
            "pos": i + 1,
            "id": element.id,
            "score": element.score
        };
        jsonResponse.push(jsonElement);
    }
    if (userId) {
        if (userId.toString().length > 18 || userId.toString().length < 17) {
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