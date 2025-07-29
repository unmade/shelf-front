import React from 'react';

import { useTranslation } from 'react-i18next';

import type { IMediaItem } from 'types/photos';

import { useAddAlbumItemsMutation } from 'store/albums';

import Dialog from 'components/ui/Dialog';

import AlbumPicker from './AlbumPicker';

interface Props {
  mediaItems: IMediaItem[];
  visible: boolean;
  onClose: () => void;
}

export default function AddToAlbumDialog({ mediaItems, visible, onClose }: Props) {
  const { t } = useTranslation('photos');

  const [addAlbumItems] = useAddAlbumItemsMutation();

  const fileIds = mediaItems.map((item) => item.fileId);
  const onItemClick = React.useCallback(
    async (albumSlug: string) => {
      await addAlbumItems({ albumSlug, fileIds });
      onClose();
    },
    [fileIds, addAlbumItems, onClose],
  );

  const onCancel = () => {
    onClose();
  };

  return (
    <Dialog
      title={t('photos:dialogs.addToAlbumDialog.title', {
        defaultValue: 'Add to Album',
        count: mediaItems.length,
      })}
      visible={visible}
      onCancel={onCancel}
    >
      <div className="flex min-h-[40vh] sm:w-96">
        <AlbumPicker className="flex-1" onItemClick={onItemClick} />
      </div>
    </Dialog>
  );
}
