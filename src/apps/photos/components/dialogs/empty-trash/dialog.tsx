import { usePurgeMediaItemsMutation } from '@/store/mediaItems';

import EmptyTrashDialog from '@/components/EmptyTrashDialog';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function EmptyTrashDialogContainer({ open, onClose }: Props) {
  const [emptyTrash, { isLoading: loading }] = usePurgeMediaItemsMutation();

  const onConfirm = async () => {
    await emptyTrash(undefined);
    onClose();
  };

  return (
    <EmptyTrashDialog loading={loading} open={open} onConfirm={onConfirm} onCancel={onClose} />
  );
}
