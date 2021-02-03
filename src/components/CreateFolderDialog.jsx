import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Dialog from './ui/Dialog';

function CreateFolderDialog({ visible, parentFolderPath, onCreate, onCancel }) {
  const [folderName, setFolderName] = React.useState(null);
  const [error, setError] = React.useState(null);

  const onNameChange = (event) => {
    // todo: validate name properly
    setFolderName(event.target.value);
  };

  const onClose = () => {
    setError(null);
    setFolderName(null);
    onCancel();
  };

  const onConfirm = () => {
    if (!folderName) {
      setError('Name cannot be empty.');
    } else {
      onCreate(folderName, parentFolderPath);
      onClose();
    }
  };

  return (
    <Dialog
      title="New Folder"
      icon={<icons.Folder className="h-6 w-6 text-blue-400" />}
      visible={visible}
      confirmTitle="Create"
      onConfirm={onConfirm}
      onCancel={onClose}
    >
      <form className="text-sm mt-4" onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
        <input
          type="input"
          className={`p-1 border rounded focus:outline-none focus:shadow-outline ${error && 'border-red-500'}`}
          placeholder="Folder name"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={onNameChange}
        />
        {error && (
          <p className="text-red-500 text-xs italic mt-3">{error}</p>
        )}
      </form>
    </Dialog>
  );
}

CreateFolderDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  parentFolderPath: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateFolderDialog;
