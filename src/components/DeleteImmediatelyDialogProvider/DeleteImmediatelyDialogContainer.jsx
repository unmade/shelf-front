import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { Scopes, waitForBackgroundTaskToComplete } from '@/store/tasks';

import { useDeleteImmediatelyBatchMutation } from 'store/files';

import DeleteImmediatelyDialog from 'components/DeleteImmediatelyDialog';

import { FileShape } from 'types';

export default function DeleteImmediatelyDialogContainer({ files, open, onClose }) {
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
        scope: Scopes.DeletingImmediatelyBatch,
        itemsCount: paths.length,
      }),
    );
    onClose();
  };

  return (
    <DeleteImmediatelyDialog
      names={files.map((file) => file.name)}
      loading={loading}
      open={open}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}

DeleteImmediatelyDialogContainer.propTypes = {
  files: PropTypes.arrayOf(FileShape).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
