import type { IMediaItem } from 'types/photos';

import { useDeleteMediaItemsImmediatelyMutation } from 'store/mediaItems';

import DeleteImmediatelyDialog from 'components/DeleteImmediatelyDialog';

interface Props {
  mediaItems: IMediaItem[];
  visible: boolean;
  onClose: () => void;
}

export default function DeleteImmediatelyDialogContainer({ mediaItems, visible, onClose }: Props) {
  const [deleteMediaItems, { isLoading: loading }] = useDeleteMediaItemsImmediatelyMutation();

  const onConfirm = async () => {
    const fileIds = mediaItems.map((item) => item.fileId);
    await deleteMediaItems(fileIds);
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <DeleteImmediatelyDialog
      names={mediaItems.map((item) => item.name)}
      loading={loading}
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
