/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './node_modules/highlight.js/styles/github.css',
          dest: './hljs',
        },
        {
          src: './node_modules/highlight.js/styles/github-dark.css',
          dest: './hljs',
        },
        {
          src: './public/favicon.ico',
          dest: './assets',
        },
        {
          src: './public/logo192.png',
          dest: './assets',
        },
        {
          src: './public/logo512.png',
          dest: './assets',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants.ts',
      containers: '/src/containers',
      hooks: '/src/hooks',
      icons: '/src/icons',
      pages: '/src/pages',
      routes: '/src/routes',
      store: '/src/store',
      types: '/src/types',
    },
  },
});
