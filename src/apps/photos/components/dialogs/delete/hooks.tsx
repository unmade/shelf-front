import { useCallback, useMemo } from 'react';

import type { IMediaItem } from '@/types/photos';

import { usePhotosDialogsRegistry } from '../registry';

export function useDeleteMediaItemsDialog() {
  const { dispatch } = usePhotosDialogsRegistry();
  const openDialog = useCallback(
    (mediaItems: IMediaItem[]) => dispatch({ type: 'open-delete-media-items', mediaItems }),
    [dispatch],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'deleteMediaItems' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
