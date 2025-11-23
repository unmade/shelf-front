import React from 'react';

import { useDispatch } from 'react-redux';

import { useMoveToTrashBatchMutation } from 'store/files';
import { Scopes, waitForBackgroundTaskToComplete } from 'store/tasks';

import DeleteDialog from 'components/DeleteDialog';

export default function DeleteDialogContainer({ files, open, onClose }) {
  const dispatch = useDispatch();

  const [moveToTrashBatch, { isLoading: loading }] = useMoveToTrashBatchMutation();

  const onConfirm = async () => {
    const paths = files.map((file) => file.path);
    const {
      data: { taskId },
    } = await moveToTrashBatch(paths);
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: Scopes.MovingToTrash,
        files,
        itemsCount: paths.length,
      }),
    );
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <DeleteDialog
      names={files.map((file) => file.name)}
      loading={loading}
      open={open}
      onConfirm={onConfirm}
      onClose={onCancel}
    />
  );
}
