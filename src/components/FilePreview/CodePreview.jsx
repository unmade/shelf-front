import React from 'react';
import PropTypes from 'prop-types';

import Highlight from '../ui/Highlight';

import 'highlight.js/styles/github.css';

const LANGS = {
  css: 'css',
  csv: 'nohighlight',
  html: 'html',
  javascript: 'javascript',
  json: 'json',
  jsx: 'jsx',
  markdown: 'markdown',
  plain: 'nohighlight',
  sql: 'sql',
  'x-c': 'c',
  'x-coffeescript': 'coffescript',
  'x-go': 'go',
  'x-nim': 'nim',
  'x-python': 'python',
  'x-rst': 'asciidoc',
  'x-rust': 'rust',
  'x-sh': 'bash',
  'x-swift': 'swift',
  'x-toml': 'toml',
  'x-vim': 'vim',
  'x-yml': 'yml',
  'x-zsh': 'zsh',
  xml: 'xml',
};

function langByMediaType({ name, mediatype }) {
  const suffix = name.split('.').pop();
  if (['cfg', 'ini'].includes(suffix)) {
    return 'ini';
  }
  const subtype = mediatype.split('/')[1];
  const lang = LANGS[subtype];
  if (lang !== null && lang !== undefined) {
    return `${lang}`;
  }
  return '';
}

function CodePreview({ file, original }) {
  const lang = langByMediaType(file);
  return (
    <div className="mt-6 bg-white">
      <div className="container mx-auto p-4">
        <Highlight language={lang} className={`whitespace-pre-wrap`}>
          {original}
        </Highlight>
      </div>
    </div>
  );
}

CodePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
  original: PropTypes.string.isRequired,
};

export default CodePreview;
