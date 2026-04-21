import type { IMediaItem } from 'types/photos';

import { FileSize } from '@/ui/filesize';

import MediaItemExif from 'components/photos/MediaItemExif';

import Categories from './Categories';

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

export default function Sidebar({ className, mediaItem }: Props) {
  return (
    <div className={className}>
      <div className="space-y-8">
        <div className="flex">
          <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
            <p className="truncate text-lg font-semibold">{mediaItem.name}</p>
            <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
              <FileSize bytes={mediaItem.size} />
            </p>
          </div>
        </div>

        <MediaItemExif mediaItemId={mediaItem.id} />
        <div>
          <Categories mediaItemId={mediaItem.id} readOnly={!!mediaItem.deletedAt} />
        </div>
      </div>
    </div>
  );
}
