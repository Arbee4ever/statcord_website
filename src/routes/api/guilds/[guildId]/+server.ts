import { error } from '@sveltejs/kit';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "statcord-leaderboard-nqzqn" });
const credentials = Realm.Credentials.anonymous();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }: any) {
    const user = await app.logIn(credentials);
    const mongo = user.mongoClient("mongodb-atlas");
    const collection = mongo.db("Guilds").collection(params.guildId);
    const index: number = Number(url.searchParams.get("i")) * 100 ?? 0;
    const userId: number = url.searchParams.get("userId") ?? null;
    let jsonResponse = [];
    if (await collection.count() == 0) {
        throw error(404, "Guild not found: " + params.guildId);
    }
    const count = await collection.count();
    if (index >= count && index - 100 <= count) {
        const end = {
            "end": "end"
        }
        return new Response(
            JSON.stringify(end), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
            }
        });
    }
    const data = await collection.aggregate([
        {
            $sort: { textscore: -1 }
        },
        {
            $limit: index + 100
        },
        {
            $skip: index
        }
    ]);
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const jsonElement = {
            "pos": (i + 1) + index,
            "id": element.id,
            "score": parseInt(element.textscore) + parseInt(element.voicescore)
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