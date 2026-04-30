import { useCallback, useMemo } from 'react';

import type { IAlbum } from '@/types/photos';

import { usePhotosDialogsRegistry } from '../registry';

export function useRenameAlbumDialog() {
  const { dispatch } = usePhotosDialogsRegistry();
  const openDialog = useCallback(
    (album: IAlbum) => dispatch({ type: 'open-rename-album', album }),
    [dispatch],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'renameAlbum' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
