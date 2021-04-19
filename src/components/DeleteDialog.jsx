import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';
import * as icons from '../icons';

import Dialog from './ui/Dialog';

function DeleteDialog({
  file, loading, uid, visible, onDelete, onCancel,
}) {
  const { mediatype, name } = file || {};
  const type = (mediatype === MediaType.FOLDER) ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Delete ${type}`}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle="Delete"
      confirmLoading={loading}
      confirmDanger
      onConfirm={() => onDelete(file.path)}
      onCancel={() => onCancel(uid)}
    >
      <p>
        Are you sure you want to move&nbsp;
        <b className="text-gray-700">{name}</b>
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
  loading: PropTypes.bool,
  uid: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

DeleteDialog.defaultProps = {
  file: null,
  loading: false,
  visible: false,
};

export default DeleteDialog;
