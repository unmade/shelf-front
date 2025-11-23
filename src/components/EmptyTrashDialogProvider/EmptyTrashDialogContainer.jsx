import React from 'react';

import { useDispatch } from 'react-redux';

import { useEmptyTrashMutation } from 'store/files';
import { Scopes, waitForBackgroundTaskToComplete } from 'store/tasks';

import EmptyTrashDialog from 'components/EmptyTrashDialog';

export default function EmptyTrashDialogContainer({ open, onClose }) {
  const dispatch = useDispatch();

  const [emptyTrash, { isLoading: loading }] = useEmptyTrashMutation();

  const onConfirm = async () => {
    const {
      data: { taskId },
    } = await emptyTrash();
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: Scopes.EmptyingTrash,
        itemsCount: 1,
      }),
    );
    onClose();
  };

  return (
    <EmptyTrashDialog loading={loading} open={open} onConfirm={onConfirm} onCancel={onClose} />
  );
}
