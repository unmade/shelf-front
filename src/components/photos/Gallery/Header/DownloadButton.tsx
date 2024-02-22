import React from 'react';

import { IMediaItem } from 'types/photos';

import * as icons from 'icons';
import { useAppDispatch } from 'hooks';

import { download } from 'store/files';

import Button from 'components/ui/Button';

import useFileFromMediaItem from '../../hooks/file-from-media-item';

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

export default function DownloadButton({ className = '', mediaItem }: Props) {
  const dispatch = useAppDispatch();

  const { id } = useFileFromMediaItem(mediaItem);

  return (
    <Button
      className={className}
      title="Download"
      variant="text"
      size="base"
      icon={<icons.Download className="h-5 w-5" />}
      onClick={() => dispatch(download(id))}
    />
  );
}
