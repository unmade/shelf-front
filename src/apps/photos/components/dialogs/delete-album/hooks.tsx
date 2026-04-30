import { useCallback, useMemo } from 'react';

import type { IAlbum } from '@/types/photos';

import { usePhotosDialogsRegistry } from '../registry';

export function useDeleteAlbumDialog() {
  const { dispatch } = usePhotosDialogsRegistry();
  const openDialog = useCallback(
    (album: IAlbum) => dispatch({ type: 'open-delete-album', album }),
    [dispatch],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'deleteAlbum' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
