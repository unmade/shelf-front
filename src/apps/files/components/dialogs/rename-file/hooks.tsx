import { useCallback, useMemo } from 'react';

import type { IFile } from '@/types/files';

import { useFilesDialogsRegistry } from '../registry';

export function useRenameFileDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(
    (file: IFile) => dispatch({ type: 'open-rename-file', file }),
    [dispatch],
  );
  const closeDialog = useCallback(() => dispatch({ type: 'close', key: 'renameFile' }), [dispatch]);
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
