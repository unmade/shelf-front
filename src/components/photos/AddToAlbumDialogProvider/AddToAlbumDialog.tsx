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

  // const [deleteMediaItems, { isLoading: loading }] = useDeleteMediaItemsMutation();

  const onConfirm = async () => {
    // const fileIds = mediaItems.map((item) => item.fileId);
    // await deleteMediaItems(fileIds);
    onClose();
  };

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
      confirmTitle={t('Move')}
      // confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <AlbumPicker />
    </Dialog>
  );
}
