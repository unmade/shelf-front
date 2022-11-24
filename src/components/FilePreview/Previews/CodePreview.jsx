import React from 'react';
import PropTypes from 'prop-types';

import usePrefersColorScheme from '../../../hooks/prefers-color-scheme';

import { useDownloadContentQuery } from '../../../store/files';

import { MEGABYTE } from '../../../filesize';

import Highlight from '../../ui/Highlight';

import Loader from '../Loader';

import NoPreview from './NoPreview';

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
  const scheme = usePrefersColorScheme();

  const shouldSkip = file.size > MAX_SIZE;
  const { data, isLoading: loading } = useDownloadContentQuery(file.path, { skip: shouldSkip });

  if (shouldSkip) {
    return <NoPreview file={file} />;
  }

  if (loading) {
    return <Loader />;
  }

  const lang = langByMediaType(file);
  return (
    <div className="container mx-auto p-4 text-sm">
      <Highlight language={lang} mode={scheme} className="whitespace-pre-wrap">
        {data?.content}
      </Highlight>
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
