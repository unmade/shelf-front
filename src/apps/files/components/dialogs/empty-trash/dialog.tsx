import { useEmptyTrashMutation } from '@/store/files';
import { Scopes, waitForBackgroundTaskToComplete } from '@/store/tasks';

import { useAppDispatch } from '@/hooks';

import EmptyTrashDialog from '@/components/EmptyTrashDialog';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function EmptyTrashDialogContainer({ open, onClose }: Props) {
  const dispatch = useAppDispatch();

  const [emptyTrash, { isLoading: loading }] = useEmptyTrashMutation();

  const onConfirm = async () => {
    const { taskId } = await emptyTrash().unwrap();
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
