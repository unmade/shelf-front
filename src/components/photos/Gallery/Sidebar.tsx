import type { IMediaItem } from 'types/photos';

import FileSize from 'components/ui/FileSize';

import Exif from 'components/Exif';

import useFileFromMediaItem from '../hooks/file-from-media-item';

import Categories from './Categories';

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

export default function Sidebar({ className, mediaItem }: Props) {
  const file = useFileFromMediaItem(mediaItem);

  return (
    <div className={className}>
      <div className="space-y-8">
        <div className="flex">
          <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
            <p className="truncate text-lg font-semibold">{mediaItem.name}</p>
            <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
              <FileSize size={mediaItem.size} />
            </p>
          </div>
        </div>

        <Exif fileId={file.id} />
        <div>
          <Categories fileId={file.id} readOnly={!!mediaItem.deletedAt} />
        </div>
      </div>
    </div>
  );
}
