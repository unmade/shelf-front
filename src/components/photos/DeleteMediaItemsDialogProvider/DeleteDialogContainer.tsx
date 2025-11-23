import type { IMediaItem } from 'types/photos';

import { useDeleteMediaItemsMutation } from 'store/mediaItems';

import DeleteDialog from 'components/DeleteDialog';

interface Props {
  mediaItems: IMediaItem[];
  open: boolean;
  onClose: () => void;
}

export default function DeleteDialogContainer({ mediaItems, open: open, onClose }: Props) {
  const [deleteMediaItems, { isLoading: loading }] = useDeleteMediaItemsMutation();

  const onConfirm = async () => {
    const fileIds = mediaItems.map((item) => item.fileId);
    await deleteMediaItems(fileIds);
    onClose();
  };

  return (
    <DeleteDialog
      names={mediaItems.map((item) => item.name)}
      loading={loading}
      open={open}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
