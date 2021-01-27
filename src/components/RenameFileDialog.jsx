import React from 'react';
import PropTypes from 'prop-types';

import { FileType } from '../constants';
import * as icons from '../icons';

import Dialog from './Dialog';

function RenameFileDialog({ file, onRename, onCancel }) {
  const visible = !!file;
  const [name, setName] = React.useState(file && file.name);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (file) {
      setName(file.name);
    }
  }, [file]);

  const onNameChange = (event) => {
    // todo: validate name properly
    setName(event.target.value || event.target.defaultValue);
  };

  const onClose = () => {
    setError(null);
    setName(null);
    onCancel();
  };

  const onConfirm = () => {
    if (!name) {
      setError('Name cannot be empty.');
    } else if (name === file.name) {
      onClose();
    } else {
      const parentPath = file.path.substring(0, file.path.length - file.name.length);
      const toPath = `${parentPath}${name}`;
      onRename(file.path, toPath);
      onClose();
    }
  };

  if (!visible) {
    return null;
  }
  const type = (file.type === FileType.FILE) ? 'File' : 'Folder';
  return (
    <Dialog
      title={`Rename ${type}`}
      icon={<icons.Edit className="h-6 w-6 text-gray-500" />}
      visible={visible}
      confirmTitle="Rename"
      onConfirm={onConfirm}
      onCancel={onClose}
    >
      <form className="text-sm mt-4" onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
        <input
          type="input"
          className={`p-1 border rounded focus:outline-none focus:shadow-outline ${error && 'border-red-500'}`}
          placeholder={`${type} name`}
          onChange={onNameChange}
          defaultValue={file.name}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        {error && (
          <p className="text-red-500 text-xs italic mt-3">{error}</p>
        )}
      </form>
    </Dialog>
  );
}

RenameFileDialog.propTypes = {
  file: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
  onRename: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

RenameFileDialog.defaultProps = {
  file: null,
};

export default RenameFileDialog;
