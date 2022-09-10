import { error } from '@sveltejs/kit';
import { createCanvas, loadImage } from 'canvas'


/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
    const canvas = createCanvas(800, 200);
    canvas.width = 800;
    canvas.height = 200;

    const ctx = canvas.getContext("2d");
    const grd = ctx?.createLinearGradient(0, 0, 800, 200);
    grd.addColorStop(0, "#2b8eaf");
    grd.addColorStop(1, "#b222a8");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 800, 200);


    return new Response(canvas.createPNGStream().read());
}