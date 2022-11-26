import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import * as icons from '../icons';

import { useCreateFolderMutation } from '../store/files';
import { selectCurrentPath } from '../store/browser';
import { fileDialogClosed } from '../store/actions/ui';
import { getFileDialogVisible } from '../store/reducers/ui';

import Dialog from './ui/Dialog';
import Input from './ui/Input';

function CreateFolderDialog({ uid }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const path = useSelector(selectCurrentPath);
  const visible = useSelector((state) => getFileDialogVisible(state, { uid }));

  const [createFolder, { isLoading: loading }] = useCreateFolderMutation();

  const [error, setError] = React.useState(null);
  const [folderName, setFolderName] = React.useState(null);

  React.useEffect(() => {
    if (!visible) {
      if (error !== null && error !== undefined) {
        setError(null);
      }
      if (folderName !== null && folderName !== undefined) {
        setFolderName(null);
      }
    }
  }, [visible, error, folderName, setError, setFolderName]);

  const onNameChange = (event) => {
    setFolderName(event.target.value);
    if (error !== null && error !== undefined) {
      setError(null);
    }
  };

  const closeDialog = () => {
    dispatch(fileDialogClosed(uid));
  };

  const onConfirm = async () => {
    if (folderName === null || folderName === '') {
      setError(t('Name cannot be empty.'));
    } else {
      await createFolder({ name: folderName, inPath: path });
      closeDialog();
    }
  };

  return (
    <Dialog
      title={t('New Folder')}
      icon={<icons.Folder className="h-6 w-6 text-blue-400" />}
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
          id="name"
          label={t('Name')}
          placeholder={t('Folder name')}
          size="sm"
          error={error}
          onChange={onNameChange}
        />
      </form>
    </Dialog>
  );
}

CreateFolderDialog.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default CreateFolderDialog;
