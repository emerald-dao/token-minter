/** @type {import('@sveltejs/kit').Config} */

import sveltePreprocess from 'svelte-preprocess';
import resolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import vercel from '@sveltejs/adapter-vercel';
import mdsvexConfig from './mdsvex.config.js';
import { mdsvex } from 'mdsvex';

const config = {
  extensions: ['.svelte', '.md', '.svx'],

  // options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
  compilerOptions: null,

  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Add process for other languages support
  preprocess: [mdsvex(mdsvexConfig), sveltePreprocess()],

  // SvelteKit uses vite-plugin-svelte. Its options can be provided directly here.
  // See the available options at https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md
  kit: {
    adapter: vercel(), // change this to whatever build adapter you want to use (e.g. static)
    files: {
      assets: 'static',
      hooks: 'src/hooks',
      lib: 'src/lib',
      routes: 'src/routes',
      serviceWorker: 'src/service-worker',
      template: 'src/app.html',
    },
    paths: {
      assets: '',
      base: '',
    },
    prerender: {
      crawl: false,
      enabled: false,
    },
    browser: {
      router: true,
    },
    vite: () => ({
      plugins: [
        builtins(),
        resolve({
          browser: true,
        }),
        globals(),
      ],
    }),
  },
};

export default config;
