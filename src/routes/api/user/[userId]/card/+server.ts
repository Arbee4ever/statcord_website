import puppeteer from 'puppeteer';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const userId = params.userId;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://arbeeco.de")
    const png = await page.screenshot({path: "test.png"});

    return new Response(png);
}