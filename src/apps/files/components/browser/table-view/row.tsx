import type { FileSchema } from '@/store/files';

import { cn } from '@/lib/utils';

import { Checkbox } from '@/ui/checkbox';
import { FileSize } from '@/ui/filesize';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/ui/item';
import { TimeAgo } from '@/ui/timeago';

import Thumbnail from '@/components/Thumbnail';
import BookmarkButton from '@/components/BookmarkButton';

import { FileActionsDropdown } from '@/apps/files/components/file-actions-dropdown';
import { Button } from '@/ui/button';
import { MoreOutlined } from '@/icons';
import { memo } from 'react';
import FileLink from '@/components/FileLink';
import { MediaType } from '@/constants';

interface Props {
  file: FileSchema;
  index: number;
}

export const TableViewRow = memo(function TableViewRow({ file, index }: Props) {
  const odd = index % 2 !== 0;

  return (
    <div className="px-4">
      <Item className={cn('group px-4', { 'bg-gray-50 dark:bg-zinc-700/30': odd })}>
        <Checkbox aria-label={`Select ${file.name}`} />
        <ItemMedia>
          <Thumbnail className="size-8" file={file} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <FileLink path={file.path} preview={file.mediatype !== MediaType.FOLDER}>
              {file.name}
            </FileLink>
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <BookmarkButton
            className="invisible group-hover:visible data-[state=on]:visible"
            fileId={file.id}
          />
        </ItemActions>
        <ItemContent className="w-40 flex-none">
          <ItemDescription>
            <TimeAgo value={file.modified_at} />
          </ItemDescription>
        </ItemContent>
        <ItemContent className="w-28 flex-none pr-4 text-right">
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
