import React from 'react';

import PropTypes from 'prop-types';

import * as icons from '../icons';

import Dialog from './ui/Dialog';

function EmptyTrashDialog({
  loading, uid, visible, onEmpty, onCancel,
}) {
  return (
    <Dialog
      title="Empty Trash"
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle="Empty"
      confirmLoading={loading}
      confirmDanger
      onConfirm={onEmpty}
      onCancel={() => { onCancel(uid); }}
    >
      <p>
        Are you sure you want to delete&nbsp;
        <b className="text-gray-700">all</b>
        &nbsp;files in the Trash?
      </p>
    </Dialog>
  );
}

EmptyTrashDialog.propTypes = {
  loading: PropTypes.bool,
  uid: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onEmpty: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

EmptyTrashDialog.defaultProps = {
  loading: false,
};

export default EmptyTrashDialog;
