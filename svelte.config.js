import adapter from '@sveltejs/adapter-cloudflare';
import path from 'path'
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: path.resolve('./src/components'),
		}
	}
};

export default config;
