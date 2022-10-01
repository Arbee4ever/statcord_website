/** @type {import('./$types').RequestHandler} */
export async function GET(query) {
    if(query.url.searchParams.get("user") != null) {
        return await fetch(`https://api.arbeeco.de/guilds?user=` + query.url.searchParams.get("user"))
    }
    return await fetch(`https://api.arbeeco.de/guilds`)
}