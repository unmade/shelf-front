import type { IFile } from '@/types/files';

import { useMoveToTrashBatchMutation } from '@/store/files';
import { Scopes, waitForBackgroundTaskToComplete } from '@/store/tasks';

import { useAppDispatch } from '@/hooks';

import DeleteDialog from '@/components/DeleteDialog';

interface Props {
  files: IFile[];
  open: boolean;
  onClose: () => void;
}

export function DeleteDialogContainer({ files, open, onClose }: Props) {
  const dispatch = useAppDispatch();

  const [moveToTrashBatch, { isLoading: loading }] = useMoveToTrashBatchMutation();

  const onConfirm = async () => {
    const paths = files.map((file) => file.path);
    const { taskId } = await moveToTrashBatch(paths).unwrap();
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

  return (
    <DeleteDialog
      names={files.map((file) => file.name)}
      loading={loading}
      open={open}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
