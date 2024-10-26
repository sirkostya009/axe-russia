import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(),

	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: vercelAdapter()
	},
};

export default config;
