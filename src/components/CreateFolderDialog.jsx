import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import * as routes from '../routes';

import Dialog from './ui/Dialog';
import Input from './ui/Input';

function CreateFolderDialog({
  loading, path, visible, onCreate, onCancel,
}) {
  const [folderName, setFolderName] = React.useState(null);
  const [error, setError] = React.useState(null);

  if (visible === false) {
    if (error !== null && error !== undefined) {
      setError(null);
    }
    if (folderName !== null && folderName !== undefined) {
      setFolderName(null);
    }
  }

  const onNameChange = (event) => {
    // todo: validate name properly
    setFolderName(event.target.value);
    if (error !== null && error !== undefined) {
      setError(null);
    }
  };

  const onClose = () => {
    onCancel();
  };

  const onConfirm = () => {
    if (folderName === null || folderName === '') {
      setError('Name cannot be empty');
    } else {
      onCreate(routes.join(path, folderName));
    }
  };

  return (
    <Dialog
      title="New Folder"
      icon={<icons.Folder className="w-6 h-6 text-blue-400" />}
      visible={visible}
      confirmTitle="Create"
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onClose}
    >
      <form className="w-full sm:min-w-1.5xs" onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
        <Input
          id="name"
          label="Name"
          placeholder="Folder name"
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
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CreateFolderDialog.defaultProps = {
  loading: false,
};

export default CreateFolderDialog;
