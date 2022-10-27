import React from 'react';
import PropTypes from 'prop-types';

import useFileContent from '../../../hooks/file-content';

import { MEGABYTE } from '../../../filesize';

import Highlight from '../../ui/Highlight';

import Loader from '../Loader';

import NoPreview from './NoPreview';

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

const MAX_SIZE = 1 * MEGABYTE;

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

function CodePreview({ file }) {
  const content = useFileContent(file.path, file.size, MAX_SIZE);

  if (file.size > MAX_SIZE) {
    return <NoPreview file={file} />;
  }

  if (content == null) {
    return <Loader />;
  }

  const lang = langByMediaType(file);
  return (
    <div className="bg-white">
      <div className="container mx-auto p-4">
        <Highlight language={lang} className="whitespace-pre-wrap">
          {content}
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
};

export default CodePreview;
