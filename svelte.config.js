import sveltePreprocess from 'svelte-preprocess';
import mdsvexConfig from './mdsvex.config.js';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';

const config = {
  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Add process for other languages support
  preprocess: [mdsvex(mdsvexConfig), sveltePreprocess()],

  // SvelteKit uses vite-plugin-svelte. Its options can be provided directly here.
  // See the available options at https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md
  kit: {
    adapter: adapter(),
  },
};

export default config;
