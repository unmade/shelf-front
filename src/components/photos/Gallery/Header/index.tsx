import React from 'react';

import { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import { useCountMediaItemsQuery } from 'store/mediaItems';

import Button from 'components/ui/Button';
import TimeAgo from 'components/ui/TimeAgo';

import DeleteButton from './DeleteButton';
import DownloadButton from './DownloadButton';
import FavouriteButton from './FavouriteButton';
import MoreButton from './MoreButton';
import RestoreButton from './RestoreButton';
import DeleteImmediatelyButton from './DeleteImmediatelyButton';
import ShareLinkButton from './ShareLinkButton';

interface Props {
  idx: number;
  mediaItem: IMediaItem;
  onGoBack: () => void;
  onInfo: () => void;
}

export default function Header({ idx, mediaItem, onGoBack, onInfo }: Props) {
  const { total, deleted } = useCountMediaItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({ total: data?.total, deleted: data?.deleted }),
  });

  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">
      <div className="flex flex-row sm:w-48">
        <Button
          variant="text"
          size="base"
          icon={<icons.ChevronLeftOutlined className="h-5 w-5" />}
          onClick={onGoBack}
        />
      </div>

      <div className="w-full min-w-0 px-4 text-center sm:px-8">
        <div className="truncate text-sm font-medium">
          <TimeAgo className="hidden sm:block" value={mediaItem.modifiedAt} format="LLLL" />
          <TimeAgo className="sm:hidden" value={mediaItem.modifiedAt} format="LLL" />
        </div>
        <p className="text-xs dark:text-zinc-400">
          {idx + 1} of {mediaItem.deletedAt ? deleted : total}
        </p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end space-x-2 text-gray-800 dark:text-zinc-200 sm:w-48">
        {mediaItem.deletedAt ? (
          <>
            <RestoreButton mediaItem={mediaItem} />
            <DeleteImmediatelyButton mediaItem={mediaItem} />
          </>
        ) : (
          <>
            <ShareLinkButton className="hidden sm:block" mediaItem={mediaItem} />
            <FavouriteButton mediaItem={mediaItem} />
            <DownloadButton className="hidden sm:block" mediaItem={mediaItem} />
            <DeleteButton className="hidden sm:block" mediaItem={mediaItem} />
            <Button
              className="hidden sm:block"
              variant="text"
              size="base"
              icon={<icons.InformationCircleOutlined className="h-5 w-5" />}
              onClick={onInfo}
            />
            <MoreButton className="sm:hidden" mediaItem={mediaItem} />
          </>
        )}
      </div>
    </div>
  );
}
