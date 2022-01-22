module.exports = {
  defaultNamespace: 'translation',
  defaultValue: '',
  indentation: 2,
  keySeparator: false,

  // see below for more details
  lexers: {
    hbs: ['HandlebarsLexer'],
    handlebars: ['HandlebarsLexer'],

    htm: ['HTMLLexer'],
    html: ['HTMLLexer'],

    mjs: ['JavascriptLexer'],
    js: ['JavascriptLexer'], // if you're writing jsx inside .js files, change this to JsxLexer
    ts: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],

    default: ['JavascriptLexer'],
  },

  lineEnding: 'auto',

  locales: ['en', 'ru'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  pluralSeparator: '_',

  input: ['src/**/*.{js,jsx}'],
  sort: true,
};
