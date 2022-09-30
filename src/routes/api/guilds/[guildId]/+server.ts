import { error } from '@sveltejs/kit';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "statcord-leaderboard-nqzqn" });
const credentials = Realm.Credentials.anonymous();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }: any) {
    return await fetch(`http://167.99.130.164:8080/guilds/`+ params.guildId)
}