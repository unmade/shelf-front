/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  alias: {
    components: './src/components',
    constants: './src/constants.js',
    hooks: './src/hooks',
    icons: './src/icons',
    routes: './src/routes',
    store: './src/store',
    types: './src/types.js',
  },
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
    'node_modules/highlight.js/styles': { url: '/hljs', static: true },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-typescript',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
    { match: 'all', src: '/s/.*', dest: '/index.html' },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    bundle: true,
    minify: true,
    target: 'es2020',
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  buildOptions: {
    /* ... */
  },
  env: {
    TRASH_FOLDER_NAME: 'Trash',
  },
};
