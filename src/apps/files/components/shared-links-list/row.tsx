import { memo } from 'react';

import { MediaType } from '@/constants';
import { MoreHorizontalIcon } from '@/icons';
import * as routes from '@/routes';

import { selectFilesSharedViaLinkById } from '@/store/sharedLinks';

import { useAppSelector } from '@/hooks';

import { cn } from '@/lib/utils';

import { Button } from '@/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/ui/item';
import { TimeAgo } from '@/ui/timeago';

import FileIcon from '@/components/FileIcon';
import { Thumbnail, ThumbnailFallback, ThumbnailImage } from '@/components/thumbnail';

import { FileLink } from '@/apps/files/components/file-link';

import { ActionsDropdown } from './actions-dropdown';
import { CopyLinkButton } from './copy-link-button';

interface Props {
  fileId: string;
  index: number;
}

export const SharedLinkRow = memo(function SharedLinkRow({ fileId, index }: Props) {
  const file = useAppSelector((state) => selectFilesSharedViaLinkById(state, fileId));

  if (!file) {
    return null;
  }

  const folder = MediaType.isFolder(file.mediatype);
  const parentPath = routes.parent(file.path);
  const linkPath = folder ? file.path : (parentPath ?? '.');
  const odd = index % 2 !== 0;

  return (
    <div className="px-4">
      <Item
        className={cn('group px-4', {
          'bg-gray-50 dark:bg-zinc-700/30': odd,
        })}
      >
        <ItemMedia>
          <Thumbnail className="size-8">
            <ThumbnailImage src={file.thumbnail_url} alt={file.name} />
            <ThumbnailFallback>
              <FileIcon className="size-8" mediatype={file.mediatype} hidden={file.hidden} shared />
            </ThumbnailFallback>
          </Thumbnail>
        </ItemMedia>
        <ItemContent className="truncate">
          <ItemTitle className="w-auto min-w-0">
            <FileLink className="truncate" path={linkPath}>
              {file.name}
            </FileLink>
          </ItemTitle>
          {parentPath && parentPath !== '.' && (
            <ItemDescription className="truncate">{parentPath}</ItemDescription>
          )}
        </ItemContent>
        <ItemActions>
          <CopyLinkButton token={file.token} filename={file.name} />
        </ItemActions>
        <ItemContent className="w-40 flex-none @max-2xl:hidden">
          <ItemDescription>
            <TimeAgo value={file.created_at} />
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ActionsDropdown fileId={fileId}>
            <Button
              className="text-muted-foreground focus:outline-none"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontalIcon />
            </Button>
          </ActionsDropdown>
        </ItemActions>
      </Item>
    </div>
  );
});
