import { useCallback, useMemo } from 'react';

import type { IMediaItem } from '@/types/photos';

import { usePhotosDialogsRegistry } from '../registry';

export function useDeleteMediaItemsImmediatelyDialog() {
  const { dispatch } = usePhotosDialogsRegistry();
  const openDialog = useCallback(
    (mediaItems: IMediaItem[]) =>
      dispatch({ type: 'open-delete-media-items-immediately', mediaItems }),
    [dispatch],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'deleteMediaItemsImmediately' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
