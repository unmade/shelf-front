import { BookmarkIcon, MoreHorizontalIcon } from '@/icons';
import { useTranslation } from 'react-i18next';

import type { FileSchema } from '@/store/files';

import { MediaType } from '@/constants';

import { Button } from '@/ui/button';
import { ButtonGroup } from '@/ui/button-group';

import { BookmarkToggle } from '@/apps/files/components/bookmark-toggle';
import { FileActionsDropdown } from '@/apps/files/components/file-actions-dropdown';
import { FileLink } from '@/apps/files/components/file-link';

interface SidePreviewActionsProps {
  files: FileSchema[];
}

export function SidePreviewActions({ files }: SidePreviewActionsProps) {
  const { t } = useTranslation('files');

  return (
    <div className="flex shrink-0 items-center justify-between py-4">
      {files.length === 1 ? (
        <FileLink
          className="truncate"
          path={files[0].path}
          preview={!MediaType.isFolder(files[0].mediatype)}
        >
          <Button size="sm">{t('browser.sidePreview.open', { defaultValue: 'Open' })}</Button>
        </FileLink>
      ) : (
        <Button size="sm">
          {t('browser.sidePreview.newFolder', { defaultValue: 'New Folder' })}
        </Button>
      )}

      <ButtonGroup>
        <BookmarkToggle fileIds={files.map((f) => f.id)} variant="outline" size="sm">
          <BookmarkIcon />
          {t('actions.toggleBookmark', { defaultValue: 'Bookmark' })}
        </BookmarkToggle>
        <FileActionsDropdown files={files}>
          <Button size="sm" variant="outline">
            <MoreHorizontalIcon />
          </Button>
        </FileActionsDropdown>
      </ButtonGroup>
    </div>
  );
}
