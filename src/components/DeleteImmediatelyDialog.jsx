import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';
import * as icons from '../icons';

import Dialog from './ui/Dialog';

function DeleteImmediatelyDialog({ file, loading, onDelete, onCancel }) {
  const visible = !!file;
  const { mediatype, name } = file || {};
  const type = (mediatype === MediaType.FOLDER) ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Permanently Delete ${type}`}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle="Delete"
      confirmLoading={loading}
      confirmDanger
      onConfirm={() => onDelete(file.path)}
      onCancel={onCancel}
    >
      <p>
        Are you sure you want to&nbsp;
        <b>permanently</b>
        &nbsp;delete&nbsp;
        <b className="text-gray-700">{name}</b>
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
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

DeleteImmediatelyDialog.defaultProps = {
  file: null,
  loading: false,
};

export default DeleteImmediatelyDialog;
