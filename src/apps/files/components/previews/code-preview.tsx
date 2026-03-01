import { Highlight } from '@/ui/highlight';

import { useAppearanceContext } from '@/components/AppearanceProvider';

import type { PreviewFile } from './no-preview';

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

interface CodePreviewProps {
  file: PreviewFile & { size: number };
  content?: string;
}

export function CodePreview({ file, content }: CodePreviewProps) {
  const { colorScheme } = useAppearanceContext();
  const lang = langByMediaType(file);

  return (
    <div className="container mx-auto p-4 text-sm">
      <Highlight
        language={lang}
        mode={colorScheme}
        className="whitespace-pre-wrap [&>code]:rounded-md"
      >
        {content}
      </Highlight>
    </div>
  );
}
