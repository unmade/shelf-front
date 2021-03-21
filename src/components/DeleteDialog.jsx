import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';
import * as icons from '../icons';

import Dialog from './ui/Dialog';

function DeleteDialog({ file, onDelete, onCancel }) {
  const visible = !!file;

  if (!visible) {
    return null;
  }
  const type = (file.mediatype === MediaType.FOLDER) ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Delete ${type}`}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle="Delete"
      confirmDanger
      onConfirm={() => onDelete(file.path)}
      onCancel={onCancel}
    >
      <p>
        Are you sure you want to move&nbsp;
        <b className="text-gray-700">{file.name}</b>
        &nbsp;to the trash?
      </p>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    mediatype: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

DeleteDialog.defaultProps = {
  file: null,
};

export default DeleteDialog;
