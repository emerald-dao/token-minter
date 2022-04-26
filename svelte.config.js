/** @type {import('@sveltejs/kit').Config} */

import preprocessor from 'svelte-preprocess';
import resolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import vercel from '@sveltejs/adapter-vercel';

const config = {
  // options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
  compilerOptions: null,

  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte'],

  // Add preprocessor for SASS compilation
  preprocess: preprocessor({
    scss: {
      prependData: "@import './src/styles/app.scss';",
    },
  }),

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
    // hydrate: false,
    prerender: {
      crawl: false,
      enabled: false,
    },
    router: true,
    ssr: true,
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

  // SvelteKit uses vite-plugin-svelte. Its options can be provided directly here.

  // See the available options at https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md
};

export default config;
