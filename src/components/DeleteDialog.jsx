import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Dialog from './Dialog';

function DeleteDialog({ file, onDelete, onCancel }) {
  const visible = !!file;

  const onConfirm = () => {
    onDelete(file.path);
    onCancel();
  };

  if (!visible) {
    return null;
  }
  const type = (file.type === 'folder') ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Delete ${type}`}
      icon={<icons.TrashOutlined className="h-6 w-6 text-red-500" />}
      visible={visible}
      confirmTitle="Delete"
      confirmColor="red"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p className="mt-4 text-sm text-gray-600">
        Are you sure you want to move&nbsp;
        <b className="text-gray-700">{file.name}</b>
        &nbsp;to the trash?
      </p>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  file: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

DeleteDialog.defaultProps = {
  file: null,
};

export default DeleteDialog;
