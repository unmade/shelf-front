import type { IFile } from '@/types/files';

import { useDeleteImmediatelyBatchMutation } from '@/store/files';
import { Scopes, waitForBackgroundTaskToComplete } from '@/store/tasks';

import { useAppDispatch } from '@/hooks';

import DeleteImmediatelyDialog from '@/components/DeleteImmediatelyDialog';

interface Props {
  files: IFile[];
  open: boolean;
  onClose: () => void;
}

export function DeleteImmediatelyDialogContainer({ files, open, onClose }: Props) {
  const dispatch = useAppDispatch();

  const [deleteImmediately, { isLoading: loading }] = useDeleteImmediatelyBatchMutation();

  const onConfirm = async () => {
    const paths = files.map((file) => file.path);
    const { taskId } = await deleteImmediately(paths).unwrap();
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
