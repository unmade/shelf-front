import { BookmarkIcon, MoreHorizontalIcon } from '@/icons';
import { useTranslation } from 'react-i18next';

import * as Collapsible from '@radix-ui/react-collapsible';

import { type FileSchema } from '@/store/files';

import { cn } from '@/lib/utils';

import { Button } from '@/ui/button';
import { ButtonGroup } from '@/ui/button-group';
import { FileSize } from '@/ui/filesize';
import { Text } from '@/ui/text';
import { TimeAgo } from '@/ui/timeago';

import { BookmarkToggle } from '@/apps/files/components/bookmark-toggle';
import { FileActionsDropdown } from '@/apps/files/components/file-actions-dropdown';
import { FileSections } from '@/apps/files/components/file-sections';

import { useGallery, useSelectGallerySlide } from './context';

function Title({ file }: { file: FileSchema }) {
  return (
    <p
      className={cn(
        'w-full py-1.5 font-semibold wrap-break-word',
        file.name.length > 128 ? 'text-sm' : 'text-base',
      )}
    >
      {file.name}
    </p>
  );
}

function Description({ file }: { file: FileSchema }) {
  return (
    <Text size="sm">
      <FileSize bytes={file.size} />
      <span> • </span>
      <TimeAgo value={file.modified_at} />
    </Text>
  );
}

function Actions({ className, file }: { className?: string; file: FileSchema }) {
  const { t } = useTranslation('files');

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Button size="sm">{t('actions.download', { defaultValue: 'Download' })}</Button>
      <ButtonGroup>
        <BookmarkToggle fileIds={[file.id]} variant="outline" size="sm">
          <BookmarkIcon />
          {t('actions.toggleBookmark', { defaultValue: 'Bookmark' })}
        </BookmarkToggle>
        <FileActionsDropdown files={[file]}>
          <Button size="sm" variant="outline">
            <MoreHorizontalIcon />
          </Button>
        </FileActionsDropdown>
      </ButtonGroup>
    </div>
  );
}

function SidePanelContent() {
  const { currentFile } = useSelectGallerySlide();

  if (!currentFile) {
    return null;
  }

  return (
    <div className="h-full w-full border-l">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div>
          <Title file={currentFile} />
          <Description file={currentFile} />
        </div>
        <Actions file={currentFile} />
        <FileSections file={currentFile} />
      </div>
    </div>
  );
}

export function GallerySidePanel() {
  const { sidePanelOpen } = useGallery();

  return (
    <Collapsible.Root
      open={sidePanelOpen}
      className={[
        'hidden h-full lg:block lg:w-xs xl:w-sm',
        'transform transition-all duration-300',
        'data-[state=closed]:pointer-events-none',
        'data-[state=closed]:w-0',
        'data-[state=closed]:translate-x-full',
      ].join(' ')}
    >
      <Collapsible.Content forceMount className="h-full overflow-hidden dark:bg-zinc-900">
        <SidePanelContent />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
