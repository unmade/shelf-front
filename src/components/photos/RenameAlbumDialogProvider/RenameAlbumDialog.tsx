import React from 'react';
import { useTranslation } from 'react-i18next';
import { IAlbum } from 'types/photos';
import Dialog from 'components/ui/Dialog';
import Input from 'components/ui/Input';
import * as icons from 'icons';

interface Props {
  album: IAlbum | null;
  visible: boolean;
  loading: boolean;
  onRename: (newTitle: string) => void;
  onCancel: () => void;
}

export default function RenameAlbumDialog({ album, visible, loading, onRename, onCancel }: Props) {
  const { t } = useTranslation();
  const [name, setName] = React.useState(album?.title ?? '');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (album != null) {
      setName(album.title);
    }
  }, [album]);

  React.useEffect(() => {
    if (!visible && error != null) {
      setError(null);
    }
  }, [visible, error]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (error != null) {
      setError(null);
    }
  };

  const onConfirm = () => {
    if (name.trim() === '') {
      setError(t('Name cannot be empty.'));
    } else if (album && name === album.title) {
      setError(t('Name is the same.'));
    } else {
      onRename(name);
    }
  };

  return (
    <Dialog
      title={t('photos:dialogs.renameAlbum.title', { defaultValue: 'Rename Album' })}
      icon={<icons.BookmarkAltOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Rename')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <form
        className="w-full sm:min-w-3xs"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      >
        <Input
          id="title"
          placeholder={t('photos:dialogs.renameAlbum.input', { defaultValue: 'Album title' })}
          size="sm"
          error={error}
          onChange={onNameChange}
          defaultValue={name}
        />
      </form>
    </Dialog>
  );
}
