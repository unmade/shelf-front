import { usePurgeMediaItemsMutation } from 'store/mediaItems';

import EmptyTrashDialog from 'components/EmptyTrashDialog';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function EmptyTrashDialogContainer({ visible, onClose }: Props) {
  const [emptyTrash, { isLoading: loading }] = usePurgeMediaItemsMutation();

  const onConfirm = async () => {
    await emptyTrash(undefined);
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
