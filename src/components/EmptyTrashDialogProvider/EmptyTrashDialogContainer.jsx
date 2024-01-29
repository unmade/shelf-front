import React from 'react';

import { useDispatch } from 'react-redux';

import { useEmptyTrashMutation } from 'store/files';
import { scopes, waitForBackgroundTaskToComplete } from 'store/tasks';

import EmptyTrashDialog from 'components/EmptyTrashDialog';

export default function EmptyTrashDialogContainer({ visible, onClose }) {
  const dispatch = useDispatch();

  const [emptyTrash, { isLoading: loading }] = useEmptyTrashMutation();

  const onConfirm = async () => {
    const {
      data: { taskId },
    } = await emptyTrash();
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: scopes.emptyingTrash,
        itemsCount: 1,
      }),
    );
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <EmptyTrashDialog
      loading={loading}
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
