import { useCallback, useMemo } from 'react';

import type { IFile } from '@/types/files';

import { useFilesDialogsRegistry } from '../registry';

export function useMoveDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(
    (files: IFile[]) => dispatch({ type: 'open-move', files }),
    [dispatch],
  );
  const closeDialog = useCallback(() => dispatch({ type: 'close', key: 'move' }), [dispatch]);
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
