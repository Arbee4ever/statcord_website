/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    return await fetch(`http://https://api.arbeeco.de/user/`+ params.userId)
}