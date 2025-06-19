import React from 'react';

import { useTranslation } from 'react-i18next';

import { IMediaItem } from 'types/photos';

import Dialog from 'components/ui/Dialog';

import AlbumPicker from './AlbumPicker';

interface Props {
  mediaItems: IMediaItem[];
  visible: boolean;
  onClose: () => void;
}

export default function AddToAlbumDialog({ mediaItems, visible, onClose }: Props) {
  const { t } = useTranslation('photos');

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
        <AlbumPicker className="flex-1" />
      </div>
    </Dialog>
  );
}
