import React from 'react';

import { useSelector } from 'react-redux';

import useSharedLink from 'hooks/shared-link';

import { RootState } from 'store/store';
import { selectMediaItemSharedLink } from 'store/photos';

import TimeAgo from 'components/ui/TimeAgo';

import CopyToClipboardButton from 'components/CopyToClipboardButton';
import Thumbnail from 'components/Thumbnail';

import useFileFromMediaItem from 'components/photos/hooks/file-from-media-item';

import SharedLinkListItemMenu from './SharedLinkListItemMenu';

interface Props {
  fileId: string;
}

export default function SharedLinkListItem({ fileId }: Props) {
  const link = useSelector((state: RootState) => selectMediaItemSharedLink(state, fileId));
  const { token, createdAt, item } = link!;
  const { name } = item;
  const sharedLink = useSharedLink({ token, filename: name });
  const file = useFileFromMediaItem(item);

  return (
    <div className="group/row flex h-[72px] w-full items-center rounded-xl px-12 even:bg-gray-50 even:ring-gray-50 even:dark:bg-zinc-700/30">
      {/* file icon and name */}
      <div className="flex w-full text-gray-900 dark:text-zinc-100 md:w-3/4">
        <div className="flex w-full min-w-0 items-center space-x-3">
          <Thumbnail className="h-12 w-12" file={file} />
          <span className="truncate">
            <div>
              <p className="truncate">{name}</p>
            </div>
          </span>
        </div>
        <div className="ml-2 flex items-center space-x-4">
          <div className="min-w-max">
            <CopyToClipboardButton
              className="invisible md:group-hover/row:visible"
              title="Copy to clipboard"
              value={sharedLink}
              disabled={sharedLink == null}
            >
              Copy link
            </CopyToClipboardButton>
          </div>
          <SharedLinkListItemMenu mediaItem={item} />
        </div>
      </div>

      <div className="ml-6 hidden items-center space-x-4 text-left dark:text-zinc-400 md:flex md:w-1/4">
        <div className="w-48">
          <TimeAgo value={createdAt} />
        </div>
      </div>
    </div>
  );
}
