import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';
import * as icons from '../icons';
import * as routes from '../routes';

import Dialog from './ui/Dialog';
import Input from './ui/Input';

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
      const toPath = routes.join(routes.parent(file.path), name);
      onRename(file.path, toPath);
      onClose();
    }
  };

  if (!visible) {
    return null;
  }
  const type = (file.mediatype === MediaType.FOLDER) ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Rename ${type}`}
      icon={<icons.Edit className="h-6 w-6" />}
      visible={visible}
      confirmTitle="Rename"
      onConfirm={onConfirm}
      onCancel={onClose}
    >
      <form onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
        <Input
          id="name"
          label="Name"
          placeholder="name"
          error={error}
          onChange={onNameChange}
          defaultValue={file.name}
          autoFocus
        />
      </form>
    </Dialog>
  );
}

RenameFileDialog.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    mediatype: PropTypes.string.isRequired,
  }),
  onRename: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

RenameFileDialog.defaultProps = {
  file: null,
};

export default RenameFileDialog;
