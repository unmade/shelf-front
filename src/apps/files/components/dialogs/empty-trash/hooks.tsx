import { useCallback, useMemo } from 'react';

import { useFilesDialogsRegistry } from '../registry';

export function useEmptyTrashDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(() => dispatch({ type: 'open-empty-trash' }), [dispatch]);
  const closeDialog = useCallback(() => dispatch({ type: 'close', key: 'emptyTrash' }), [dispatch]);
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
