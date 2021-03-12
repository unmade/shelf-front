import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';
import * as icons from '../icons';

import Dialog from './ui/Dialog';

function DeleteImmediatelyDialog({ file, onDelete, onCancel }) {
  const visible = !!file;

  const onConfirm = () => {
    onDelete(file.path);
    onCancel();
  };

  if (!visible) {
    return null;
  }
  const type = (file.mediatype === MediaType.FOLDER) ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Permanently Delete ${type}`}
      icon={<icons.TrashOutlined className="h-6 w-6 text-red-500" />}
      visible={visible}
      confirmTitle="Delete"
      confirmDanger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p className="mt-4 text-sm text-gray-600">
        Are you sure you want to&nbsp;
        <b>permanently</b>
        &nbsp;delete&nbsp;
        <b className="text-gray-700">{file.name}</b>
        ?
      </p>
    </Dialog>
  );
}

DeleteImmediatelyDialog.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    mediatype: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

DeleteImmediatelyDialog.defaultProps = {
  file: null,
};

export default DeleteImmediatelyDialog;
