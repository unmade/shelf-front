import React from 'react';

import { useTranslation } from 'react-i18next';

import { IAlbum } from 'types/photos';

import { useDeleteAlbumMutation } from 'store/albums';

import * as icons from 'icons';

import Dialog from 'components/ui/Dialog';

interface Props {
  visible: boolean;
  album: IAlbum | null;
  onClose: () => void;
}

export default function DeleteAlbumDialog({ visible, album, onClose }: Props) {
  const { t } = useTranslation();
  const [deleteAlbum, { isLoading: loading }] = useDeleteAlbumMutation();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!visible && errorMessage != null) {
      setErrorMessage(null);
    }
  }, [visible, errorMessage]);

  const onConfirm = async () => {
    if (!album) return;
    try {
      await deleteAlbum(undefined).unwrap();
      onClose();
    } catch {
      setErrorMessage(t('Something went wrong.'));
    }
  };

  const dialogText = album ? (
    <span>
      {t('photos:dialogs.deleteAlbum.description', {
        defaultValue: 'Are you sure you want to delete',
      })}{' '}
      <b className="text-gray-700 dark:text-zinc-200">{album.title}</b>?
    </span>
  ) : null;

  return (
    <Dialog
      title={t('photos:dialogs.deleteAlbum.title', { defaultValue: 'Delete Album' })}
      icon={<icons.BookmarkAltOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Delete')}
      confirmLoading={loading}
      confirmDanger
      onConfirm={onConfirm}
      onCancel={onClose}
    >
      <p>{dialogText}</p>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </Dialog>
  );
}
