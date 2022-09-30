/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    if(url.searchParams.get("user") != null) {
        return await fetch(`http://167.99.130.164:8080/guilds?user=` + url.searchParams.get("user"))
    }
    return await fetch(`http://167.99.130.164:8080/guilds`)
}