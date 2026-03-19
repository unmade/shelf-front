import * as Collapsible from '@radix-ui/react-collapsible';

import { type FileSchema } from '@/store/files';

import { useSelection } from '@/components/SelectionProvider';

import { useSelectFiles } from '../contexts/data';

import { MultipleFilesPreview } from './multiple-fiile-preview';
import { SingleFilePreview } from './single-file-preview';

interface SidePreviewContentProps {
  files: FileSchema[];
}

function Content({ files }: SidePreviewContentProps) {
  if (files.length === 0) {
    return null;
  }

  if (files.length > 1) {
    return <MultipleFilesPreview files={files} />;
  }

  const file = files[0];
  return <SingleFilePreview file={file} />;
}

export function FileBrowserSidePreview() {
  const { selectedIds } = useSelection();
  const selectedFiles = useSelectFiles(selectedIds);

  return (
    <Collapsible.Root
      open={selectedFiles.length > 0}
      className={[
        'h-full max-sm:hidden md:w-sm xl:w-md',
        'transform transition-all duration-500',
        'data-[state=closed]:pointer-events-none',
        'data-[state=closed]:w-0',
        'data-[state=closed]:translate-x-full',
      ].join(' ')}
    >
      <Collapsible.Content forceMount className="h-full w-full overflow-hidden pt-2 pr-5 pl-2">
        <div className="h-full overflow-y-auto rounded-lg border px-4 pt-4 pb-2 dark:bg-zinc-900">
          <Content files={selectedFiles} />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
