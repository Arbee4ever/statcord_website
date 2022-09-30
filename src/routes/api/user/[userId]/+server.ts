/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    return await fetch(`http://167.99.130.164:8080/user/`+ params.userId)
}