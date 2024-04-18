import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, resolvePath } from 'react-router-dom';

import * as icons from 'icons';
import * as routes from 'routes';

import { useCreateAlbumMutation } from 'store/albums';

import Dialog from 'components/ui/Dialog';
import Input from 'components/ui/Input';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CreateAlbumDialog({ visible, onClose }: Props) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [createAlbum, { isLoading: loading }] = useCreateAlbumMutation();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [albumTitle, setAlbumTitle] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!visible) {
      if (errorMessage != null) {
        setErrorMessage(null);
      }
      if (albumTitle != null) {
        setAlbumTitle(null);
      }
    }
  }, [visible, errorMessage, albumTitle, setErrorMessage, setAlbumTitle]);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumTitle(event.target.value);
    if (errorMessage != null) {
      setErrorMessage(null);
    }
  };

  const closeDialog = () => {
    onClose();
  };

  const onConfirm = async () => {
    if (albumTitle === null || albumTitle === '') {
      setErrorMessage(t('Name cannot be empty.'));
    } else {
      try {
        const album = await createAlbum({ title: albumTitle }).unwrap();
        navigate(resolvePath(routes.encodePath(album.title), routes.PHOTOS_ALBUMS.prefix));
      } catch {
        setErrorMessage(t('Something went wrong.'));
      }
      closeDialog();
    }
  };

  return (
    <Dialog
      title={t('Create Album')}
      icon={<icons.BookmarkAltOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Create')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={closeDialog}
    >
      <form
        className="w-full sm:min-w-1.5xs"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      >
        <Input
          id="title"
          placeholder={t('Album title')}
          size="sm"
          error={errorMessage}
          onChange={onTitleChange}
        />
      </form>
    </Dialog>
  );
}
