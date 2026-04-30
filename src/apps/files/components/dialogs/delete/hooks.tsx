import { useCallback, useMemo } from 'react';

import type { IFile } from '@/types/files';

import { useFilesDialogsRegistry } from '../registry';

export function useDeleteDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(
    (files: IFile[]) => dispatch({ type: 'open-delete', files }),
    [dispatch],
  );
  const closeDialog = useCallback(() => dispatch({ type: 'close', key: 'delete' }), [dispatch]);
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
