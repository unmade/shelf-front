import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useNavigate, resolvePath } from 'react-router-dom';

import * as icons from '../../icons';
import * as routes from '../../routes';

import { useCreateFolderMutation } from '../../store/files';

import Dialog from '../ui/Dialog';
import Input from '../ui/Input';

function CreateFolderDialog({ inPath, visible, onClose }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [createFolder, { isLoading: loading }] = useCreateFolderMutation();

  const [errorMessage, setErrorMessage] = React.useState(null);
  const [folderName, setFolderName] = React.useState(null);

  React.useEffect(() => {
    if (!visible) {
      if (errorMessage != null) {
        setErrorMessage(null);
      }
      if (folderName != null) {
        setFolderName(null);
      }
    }
  }, [visible, errorMessage, folderName, setErrorMessage, setFolderName]);

  const onNameChange = (event) => {
    setFolderName(event.target.value);
    if (errorMessage != null) {
      setErrorMessage(null);
    }
  };

  const closeDialog = () => {
    onClose();
  };

  const onConfirm = async () => {
    if (folderName === null || folderName === '') {
      setErrorMessage(t('Name cannot be empty.'));
    } else {
      const { data, error } = await createFolder({ name: folderName, inPath });
      closeDialog();
      if (error == null) {
        navigate(resolvePath(data.path, routes.FILES.prefix));
      }
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
          error={errorMessage}
          onChange={onNameChange}
        />
      </form>
    </Dialog>
  );
}

CreateFolderDialog.propTypes = {
  inPath: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

CreateFolderDialog.defaultProps = {
  inPath: null,
};

export default CreateFolderDialog;
