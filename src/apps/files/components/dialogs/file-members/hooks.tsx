import { useCallback, useMemo } from 'react';

import { useFilesDialogsRegistry } from '../registry';

export function useFileMembersDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(
    (fileId: string) => dispatch({ type: 'open-file-members', fileId }),
    [dispatch],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'fileMembers' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
