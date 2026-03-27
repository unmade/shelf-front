import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MoreVerticalIcon } from '@/icons';

import type { FileSchema } from '@/store/files';

import { MediaType, ThumbnailSize } from '@/constants';

import { cn } from '@/lib/utils';

import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Item, ItemActions, ItemContent, ItemHeader, ItemTitle } from '@/ui/item';

import FileIcon from '@/components/FileIcon';
import { Thumbnail, ThumbnailFallback, ThumbnailImage } from '@/components/thumbnail';
import { useSelection } from '@/components/SelectionProvider';

import { FileActionsDropdown } from '@/apps/files/components/file-actions-dropdown';
import { FileLink } from '@/apps/files/components/file-link';

interface Props {
  file: FileSchema;
}

export const GridViewItem = memo(function GridViewItem({ file }: Props) {
  const { t } = useTranslation('files');
  const { isSelected, select, toggleSelection } = useSelection();

  const selected = isSelected(file.id);
  const folder = MediaType.isFolder(file.mediatype);
  const hasThumbnail = !!file.thumbnail_url && !folder;

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked !== 'indeterminate') {
      toggleSelection(file.id);
    }
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (
      target.closest('[data-slot="checkbox"]') ||
      target.closest('[data-slot="item-actions"]') ||
      target.closest('[data-slot="item-title"]')
    ) {
      return;
    }

    if (!selected) {
      select([file.id]);
    }
  };

  return (
    <div className="aspect-square p-2">
      <Item
        className={cn(
          'h-full flex-col items-stretch p-1.5',
          selected
            ? 'ring-2 ring-blue-600 ring-offset-1 dark:ring-indigo-500 dark:ring-offset-zinc-900'
            : 'group-hover/item:bg-accent',
        )}
        size="sm"
        onClick={handleItemClick}
      >
        <Checkbox
          checked={selected}
          onCheckedChange={handleCheckboxChange}
          aria-label={t('browser.selectFile', { defaultValue: 'Select {{name}}', name: file.name })}
          className={cn(
            'absolute top-6 left-6 z-10 size-4 transition-opacity',
            selected ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100',
          )}
        />

        <ItemHeader
          className={cn(
            'min-h-0 flex-1 basis-0 items-center justify-center overflow-hidden rounded-md transition-all',
            'bg-gray-50',
            'dark:bg-zinc-800 lg:dark:bg-zinc-900/30',
            hasThumbnail && 'bg-muted',
          )}
        >
          <Thumbnail className="size-full rounded-md">
            <ThumbnailImage
              src={file.thumbnail_url}
              size={ThumbnailSize.lg}
              objectFit="cover"
              alt={file.name}
            />
            <ThumbnailFallback>
              <FileIcon className="size-14" mediatype={file.mediatype} hidden={file.hidden} />
            </ThumbnailFallback>
          </Thumbnail>
        </ItemHeader>

        <div className="flex min-w-0 items-center">
          <ItemContent className="min-w-0">
            <ItemTitle className="w-full pr-0.5 pl-2 text-left">
              <FileLink
                className={cn(
                  'line-clamp-1 font-normal break-all',
                  file.hidden ? 'text-muted-foreground' : 'text-foreground',
                )}
                path={file.path}
                preview={!folder}
              >
                {file.name}
              </FileLink>
            </ItemTitle>
          </ItemContent>

          <ItemActions>
            <FileActionsDropdown files={[file]}>
              <Button className="size-6 rounded" size="icon" variant="ghost">
                <MoreVerticalIcon className="size-3.5" />
              </Button>
            </FileActionsDropdown>
          </ItemActions>
        </div>
      </Item>
    </div>
  );
});

GridViewItem.displayName = 'GridViewItem';
