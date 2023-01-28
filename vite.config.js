import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],

	// Fixes issue with @onflow/fcl. "node-fetch" couldn't be used in client, so replaced it with "isomorphic-fetch"
	resolve: {
		alias: {
			'node-fetch': 'isomorphic-fetch'
		}
	}
};

export default config;
