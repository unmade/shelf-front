import { useCallback, useMemo } from 'react';

import { useFilesDialogsRegistry } from '../registry';

export function useCreateFolderDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(
    (path: string) => dispatch({ type: 'open-create-folder', path }),
    [dispatch],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'createFolder' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
