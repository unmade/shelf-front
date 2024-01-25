import React from 'react';

import { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import { useDeleteDialog } from 'components/DeleteDialogProvider';

import useFileFromMediaItem from '../../hooks/file-from-media-item';

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

export default function DeleteButton({ className = '', mediaItem }: Props) {
  const file = useFileFromMediaItem(mediaItem);
  const { openDialog: openDeleteDialog } = useDeleteDialog();

  return (
    <Button
      className={className}
      title="Move to Trash"
      variant="text"
      size="base"
      icon={<icons.TrashOutlined className="h-5 w-5" />}
      color="danger"
      onClick={() => openDeleteDialog([file])}
    />
  );
}
