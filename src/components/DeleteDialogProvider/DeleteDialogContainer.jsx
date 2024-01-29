import React from 'react';

import { useDispatch } from 'react-redux';

import { useMoveToTrashBatchMutation } from 'store/files';
import { scopes, waitForBackgroundTaskToComplete } from 'store/tasks';

import DeleteDialog from 'components/DeleteDialog';

export default function DeleteDialogContainer({ files, visible, onClose }) {
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
        scope: scopes.movingToTrash,
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
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
