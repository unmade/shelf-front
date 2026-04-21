import type { IMediaItem } from 'types/photos';

import { ChevronLeftIcon, InfoCircleIcon } from '@/icons';

import { Button } from '@/ui/button';
import { TimeAgo } from '@/ui/timeago';

import DeleteButton from './DeleteButton';
import DownloadButton from './DownloadButton';
import FavouriteButton from './FavouriteButton';
import MoreButton from './MoreButton';
import RestoreButton from './RestoreButton';
import DeleteImmediatelyButton from './DeleteImmediatelyButton';

interface Props {
  idx: number;
  itemsCount?: number;
  mediaItem: IMediaItem;
  onGoBack: () => void;
  onInfo: () => void;
}

export default function Header({ idx, mediaItem, itemsCount, onGoBack, onInfo }: Props) {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">
      <div className="flex flex-row sm:w-48">
        <Button variant="ghost" size="icon" onClick={onGoBack}>
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="w-full min-w-0 px-4 text-center sm:px-8">
        <div className="truncate text-sm font-medium">
          <TimeAgo className="max-sm:hidden" value={mediaItem.modifiedAt} format="LLLL" />
          <TimeAgo className="sm:hidden" value={mediaItem.modifiedAt} format="LLL" />
        </div>
        <p className="text-xs dark:text-zinc-400">
          {itemsCount != null && `${idx + 1} of ${itemsCount}`}
        </p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end space-x-2 text-gray-800 sm:w-48 dark:text-zinc-200">
        {mediaItem.deletedAt ? (
          <>
            <RestoreButton mediaItem={mediaItem} />
            <DeleteImmediatelyButton mediaItem={mediaItem} />
          </>
        ) : (
          <>
            <FavouriteButton mediaItem={mediaItem} />
            <DownloadButton className="max-sm:hidden" mediaItem={mediaItem} />
            <DeleteButton className="max-sm:hidden" mediaItem={mediaItem} />
            <Button className="max-sm:hidden" variant="ghost" size="icon" onClick={onInfo}>
              <InfoCircleIcon />
            </Button>
            <MoreButton className="sm:hidden" mediaItem={mediaItem} />
          </>
        )}
      </div>
    </div>
  );
}
