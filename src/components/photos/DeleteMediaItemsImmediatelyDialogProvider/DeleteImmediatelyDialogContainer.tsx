import type { IMediaItem } from 'types/photos';

import { useDeleteMediaItemsImmediatelyMutation } from 'store/mediaItems';

import DeleteImmediatelyDialog from 'components/DeleteImmediatelyDialog';

interface Props {
  mediaItems: IMediaItem[];
  open: boolean;
  onClose: () => void;
}

export default function DeleteImmediatelyDialogContainer({ mediaItems, open, onClose }: Props) {
  const [deleteMediaItems, { isLoading: loading }] = useDeleteMediaItemsImmediatelyMutation();

  const onConfirm = async () => {
    const fileIds = mediaItems.map((item) => item.fileId);
    await deleteMediaItems(fileIds);
    onClose();
  };

  return (
    <DeleteImmediatelyDialog
      names={mediaItems.map((item) => item.name)}
      loading={loading}
      open={open}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
