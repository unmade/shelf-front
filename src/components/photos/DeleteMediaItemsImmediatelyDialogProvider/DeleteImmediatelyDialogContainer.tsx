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
    const mediaItemIds = mediaItems.map((item) => item.id);
    await deleteMediaItems(mediaItemIds);
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
