import { type FileSchema, useDownloadContentQuery } from '@/store/files';

import { MEGABYTE } from '@/ui/filesize';
import { Highlight } from '@/ui/highlight';
import { Spinner } from '@/ui/spinner';

import { useAppearanceContext } from '@/components/AppearanceProvider';

import { NoPreview } from './no-preview';

const LANGS: Record<string, string> = {
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

function langByMediaType({ name, mediatype }: { name: string; mediatype: string }) {
  const suffix = name.split('.').pop();
  if (suffix && ['cfg', 'ini'].includes(suffix)) {
    return 'ini';
  }
  const subtype = mediatype.split('/')[1];
  const lang = LANGS[subtype];
  if (lang != null) {
    return `${lang}`;
  }
  return '';
}

interface Props {
  file: FileSchema;
}

export function CodeSlide({ file }: Props) {
  const { colorScheme } = useAppearanceContext();

  const shouldSkip = file.size > MAX_SIZE;
  const { data, isLoading: loading } = useDownloadContentQuery(file.path, { skip: shouldSkip });

  if (shouldSkip) {
    return <NoPreview file={file} />;
  }

  if (loading) {
    return <Spinner className="h-full" />;
  }

  const lang = langByMediaType(file);
  return (
    <div className="container mx-auto p-4 text-sm">
      <Highlight
        language={lang}
        mode={colorScheme}
        className="whitespace-pre-wrap [&>code]:rounded-md"
      >
        {data?.content}
      </Highlight>
    </div>
  );
}
