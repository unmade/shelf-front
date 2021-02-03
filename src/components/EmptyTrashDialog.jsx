import React from 'react';

import PropTypes from 'prop-types';

import * as icons from '../icons';

import Dialog from './Dialog';

function EmptyTrashDialog({ visible, onEmpty, onCancel }) {
  const onConfirm = () => {
    onEmpty();
    onCancel();
  };

  if (!visible) {
    return null;
  }

  return (
    <Dialog
      title="Empty Trash"
      icon={<icons.TrashOutlined className="h-6 w-6 text-red-500" />}
      visible={visible}
      confirmTitle="Empty"
      confirmColor="red"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p className="mt-4 text-sm text-gray-600">
        Are you sure you want to delete&nbsp;
        <b>all</b>
        &nbsp;files in Trash?
      </p>
    </Dialog>
  );
}

EmptyTrashDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onEmpty: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EmptyTrashDialog;
