import { useCallback, useMemo } from 'react';

import { usePhotosDialogsRegistry } from '../registry';

export function useEmptyTrashDialog() {
  const { dispatch } = usePhotosDialogsRegistry();
  const openDialog = useCallback(() => dispatch({ type: 'open-empty-trash' }), [dispatch]);
  const closeDialog = useCallback(() => dispatch({ type: 'close', key: 'emptyTrash' }), [dispatch]);
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
