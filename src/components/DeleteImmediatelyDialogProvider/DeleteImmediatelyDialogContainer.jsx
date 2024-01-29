import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { useDeleteImmediatelyBatchMutation } from 'store/files';
import { scopes, waitForBackgroundTaskToComplete } from 'store/tasks';

import DeleteImmediatelyDialog from 'components/DeleteImmediatelyDialog';

import { FileShape } from 'types';

export default function DeleteImmediatelyDialogContainer({ files, visible, onClose }) {
  const dispatch = useDispatch();

  const [deleteImmediately, { isLoading: loading }] = useDeleteImmediatelyBatchMutation();

  const onConfirm = async () => {
    const paths = files.map((file) => file.path);
    const {
      data: { taskId },
    } = await deleteImmediately(paths);
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: scopes.deletingImmediatelyBatch,
        itemsCount: paths.length,
      }),
    );
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <DeleteImmediatelyDialog
      names={files.map((file) => file.name)}
      loading={loading}
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

DeleteImmediatelyDialogContainer.propTypes = {
  files: PropTypes.arrayOf(FileShape).isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
