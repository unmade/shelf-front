import { useCallback, useMemo } from 'react';

import type { IFile } from '@/types/files';

import { useFilesDialogsRegistry } from '../registry';

export function useDeleteImmediatelyDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(
    (files: IFile[]) => dispatch({ type: 'open-delete-immediately', files }),
    [dispatch],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: 'close', key: 'deleteImmediately' }),
    [dispatch],
  );
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
