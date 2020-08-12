import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Dialog from './Dialog';

function DeleteDialog({ item, onConfirm, onCancel }) {
  const visible = !!item;

  const onSubmit = () => {
    onConfirm(item.path);
    onCancel();
  };

  if (!visible) {
    return null;
  }
  const type = (item.type === 'folder') ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Delete ${type}`}
      icon={<icons.TrashOutlined className="h-6 w-6 text-red-500" />}
      visible={visible}
      okTitle="Delete"
      okColor="red"
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <p className="mt-4 text-sm text-gray-600">
        Are you sure you want to move&nbsp;
        <b className="text-gray-700">{item.name}</b>
        &nbsp;to the trash?
      </p>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

DeleteDialog.defaultProps = {
  item: null,
};

export default DeleteDialog;
