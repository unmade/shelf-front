import { useCallback, useMemo } from 'react';

import { usePhotosDialogsRegistry } from '../registry';

export function useCreateAlbumDialog() {
  const { dispatch } = usePhotosDialogsRegistry();
  const openDialog = useCallback(() => dispatch({ type: 'open-create-album' }), [dispatch]);
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'createAlbum' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
