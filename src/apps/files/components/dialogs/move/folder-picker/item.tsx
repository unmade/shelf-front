import { memo } from 'react';

import type { FileSchema } from '@/store/files';
import { selectFileByIdInPath } from '@/store/files';

import { cn } from '@/lib/utils';

import { MediaType } from '@/constants';
import { useAppSelector } from '@/hooks';

import type { ItemRendererProps } from '@/ui/vlist';

import FileIcon from '@/components/FileIcon';
import { Thumbnail, ThumbnailFallback, ThumbnailImage } from '@/components/thumbnail';

interface ItemData {
  items: string[];
  path: string;
  onItemClick: (path: string) => (event: React.MouseEvent) => void;
}

export const FolderPickerItem = memo(function FolderPickerItem({
  data,
  index,
  style,
}: ItemRendererProps<ItemData>) {
  const { path, items, onItemClick } = data;
  const itemId = items[index];

  const item = useAppSelector((state) => selectFileByIdInPath(state, { path, id: itemId })) as
    | FileSchema
    | undefined;

  if (item == null) {
    return null;
  }

  const folder = MediaType.isFolder(item.mediatype);

  return (
    <div style={style}>
      <button
        type="button"
        className="h-full w-full rounded-lg px-4 focus:outline-none"
        onClick={onItemClick(item.path)}
        disabled={!folder}
      >
        <div
          className={cn('flex min-w-0 flex-row items-center gap-2 text-sm', {
            'text-gray-500 dark:text-zinc-400': item.hidden,
            'text-gray-800 dark:text-zinc-200': !item.hidden,
            'opacity-25': !folder,
          })}
        >
          <Thumbnail className="size-7 shrink-0">
            <ThumbnailImage src={item.thumbnail_url} alt={item.name} />
            <ThumbnailFallback>
              <FileIcon
                className="size-7"
                mediatype={item.mediatype}
                hidden={item.hidden}
                shared={item.shared}
              />
            </ThumbnailFallback>
          </Thumbnail>
          <p className="truncate">{item.name}</p>
        </div>
      </button>
    </div>
  );
});

export type { ItemData };
