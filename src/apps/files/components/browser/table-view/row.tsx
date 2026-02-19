import { memo } from 'react';

import type { FileSchema } from '@/store/files';

import { cn } from '@/lib/utils';

import { MediaType } from '@/constants';
import { BookmarkOutlined, MoreOutlined } from '@/icons';

import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { FileSize } from '@/ui/filesize';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/ui/item';
import { TimeAgo } from '@/ui/timeago';

import Thumbnail from '@/components/Thumbnail';

import { BookmarkToggle } from '@/apps/files/components/bookmark-toggle';
import { FileActionsDropdown } from '@/apps/files/components/file-actions-dropdown';
import { FileLink } from '@/apps/files/components/file-link';
import { useSelectionContext } from '@/apps/files/components/selection-context';

interface Props {
  file: FileSchema;
  index: number;
}

export const TableViewRow = memo(function TableViewRow({ file, index }: Props) {
  const { isSelected, select, toggleSelection } = useSelectionContext();

  const selected = isSelected(file.id);
  const folder = MediaType.isFolder(file.mediatype);

  const odd = index % 2 !== 0;

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked !== 'indeterminate') {
      toggleSelection(file.id);
    }
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (
      target.closest('[data-slot="checkbox"]') ||
      target.closest('[data-slot="item-actions"') ||
      (folder && target.closest('[data-slot="item-title"]'))
    ) {
      return;
    }

    if (!selected) {
      select([file.id]);
    }
  };

  return (
    <div className="px-4">
      <Item
        className={cn('group px-4', {
          'bg-gray-50 dark:bg-zinc-700/30': odd && !selected,
          'bg-blue-100 dark:bg-indigo-600/30': selected,
        })}
        onClick={handleItemClick}
      >
        <Checkbox
          checked={selected}
          onCheckedChange={handleCheckboxChange}
          aria-label={`Select ${file.name}`}
        />
        <ItemMedia>
          <Thumbnail className="size-8" file={file} />
        </ItemMedia>
        <ItemContent className="truncate">
          <ItemTitle className="w-auto min-w-0">
            <FileLink className="truncate" path={file.path} preview={!folder}>
              {file.name}
            </FileLink>
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <BookmarkToggle
            className="invisible group-hover:visible data-[state=on]:visible data-[state=on]:bg-transparent"
            fileIds={[file.id]}
          >
            <BookmarkOutlined />
          </BookmarkToggle>
        </ItemActions>
        <ItemContent className="w-40 flex-none @max-2xl:hidden">
          <ItemDescription>
            <TimeAgo value={file.modified_at} />
          </ItemDescription>
        </ItemContent>
        <ItemContent className="w-28 flex-none pr-4 text-right @max-2xl:hidden">
          <ItemDescription>
            <FileSize bytes={file.size} />
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <FileActionsDropdown files={[file]}>
            <Button
              className="text-muted-foreground focus:outline-none"
              size="icon"
              variant="ghost"
            >
              <MoreOutlined />
            </Button>
          </FileActionsDropdown>
        </ItemActions>
      </Item>
    </div>
  );
});

TableViewRow.displayName = 'TableViewRow';
