import React from 'react';

import { IAlbum } from 'types/photos';

import { useUpdateAlbumMutation } from 'store/albums';

import RenameAlbumDialog from './RenameAlbumDialog';

interface Props {
  album: IAlbum | null;
  visible: boolean;
  onClose: () => void;
}

export default function RenameAlbumDialogContainer({ album, visible, onClose }: Props) {
  const [updateAlbum, { isLoading: loading }] = useUpdateAlbumMutation();

  const onRename = async (newTitle: string) => {
    if (!album || newTitle === album.title || newTitle.trim() === '') {
      onClose();
      return;
    }
    try {
      await updateAlbum({ albumSlug: album.slug, title: newTitle.trim() }).unwrap();
      onClose();
    } catch {
      // error handled in dialog
    }
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <RenameAlbumDialog
      album={album}
      visible={visible}
      loading={loading}
      onRename={onRename}
      onCancel={onCancel}
    />
  );
}
