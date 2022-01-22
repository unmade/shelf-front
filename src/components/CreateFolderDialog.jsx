import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import * as icons from '../icons';
import * as routes from '../routes';

import Dialog from './ui/Dialog';
import Input from './ui/Input';

function CreateFolderDialog({
  loading, path, uid, visible, onCreate, onCancel,
}) {
  const { t } = useTranslation();

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
    // todo: validate name properly
    setFolderName(event.target.value);
    if (error !== null && error !== undefined) {
      setError(null);
    }
  };

  const onConfirm = () => {
    if (folderName === null || folderName === '') {
      setError(t('Name cannot be empty.'));
    } else {
      onCreate(routes.join(path, folderName));
    }
  };

  return (
    <Dialog
      title={t('New Folder')}
      icon={<icons.Folder className="w-6 h-6 text-blue-400" />}
      visible={visible}
      confirmTitle={t('Create')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={() => { onCancel(uid); }}
    >
      <form className="w-full sm:min-w-1.5xs" onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
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
  loading: PropTypes.bool,
  path: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CreateFolderDialog.defaultProps = {
  loading: false,
};

export default CreateFolderDialog;
