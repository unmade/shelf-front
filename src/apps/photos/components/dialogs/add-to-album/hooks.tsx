import { useCallback, useMemo } from 'react';

import type { IMediaItem } from '@/types/photos';

import { usePhotosDialogsRegistry } from '../registry';

export function useAddToAlbumDialog() {
  const { dispatch } = usePhotosDialogsRegistry();
  const openDialog = useCallback(
    (mediaItems: IMediaItem[]) => dispatch({ type: 'open-add-to-album', mediaItems }),
    [dispatch],
  );
  const closeDialog = useCallback(() => dispatch({ type: 'close', key: 'addToAlbum' }), [dispatch]);
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
