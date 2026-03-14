import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MediaType } from '@/constants';
import * as icons from '@/icons';
import * as routes from '@/routes';

import { selectSharedFileById } from '@/store/sharing';

import { useAppSelector } from '@/hooks';

import { cn } from '@/lib/utils';

import { Button } from '@/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/ui/item';

import FileIcon from '@/components/FileIcon';
import { Thumbnail, ThumbnailFallback, ThumbnailImage } from '@/components/thumbnail';

import { FileLink } from '@/apps/files/components/file-link';

import { ActionsDropdown } from './actions-dropdown';

interface Props {
  fileId: string;
  index: number;
}

export const SharedFileRow = memo(function SharedFileRow({ fileId, index }: Props) {
  const { t } = useTranslation('files');
  const file = useAppSelector((state) => selectSharedFileById(state, fileId));

  if (!file) return null;

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
          <Thumbnail>
            <ThumbnailImage src={file.thumbnail_url} alt={file.name} />
            <ThumbnailFallback>
              <FileIcon className="size-8" mediatype={file.mediatype} hidden={file.hidden} shared />
            </ThumbnailFallback>
          </Thumbnail>
        </ItemMedia>
        <ItemContent className="truncate">
          <ItemTitle className="w-auto min-w-0">
            <FileLink className="truncate" path={linkPath} preview={!folder}>
              {file.name}
            </FileLink>
          </ItemTitle>
          {parentPath && parentPath !== '.' && (
            <ItemDescription className="truncate">{parentPath}</ItemDescription>
          )}
        </ItemContent>
        <ItemContent className="w-32 flex-none @max-2xl:hidden">
          <ItemDescription>
            {t('sharedInApp.membersCount', {
              defaultValue: '{{ count }} member(s)',
              count: file.members?.length ?? 0,
            })}
          </ItemDescription>
        </ItemContent>
        <ItemContent className="w-36 flex-none @max-2xl:hidden">
          <ItemDescription className="truncate">@{file.owner?.username}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ActionsDropdown fileId={fileId}>
            <Button
              className="text-muted-foreground focus:outline-none"
              size="icon"
              variant="ghost"
            >
              <icons.MoreOutlined />
            </Button>
          </ActionsDropdown>
        </ItemActions>
      </Item>
    </div>
  );
});
