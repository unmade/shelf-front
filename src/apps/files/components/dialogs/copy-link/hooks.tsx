import { useCallback, useMemo } from 'react';

import type { IFile } from '@/types/files';

import { useFilesDialogsRegistry } from '../registry';

export function useCopyLinkDialog() {
  const { dispatch } = useFilesDialogsRegistry();
  const openDialog = useCallback(
    (file: IFile) => dispatch({ type: 'open-copy-link', file }),
    [dispatch],
  );
  const closeDialog = useCallback(() => dispatch({ type: 'close', key: 'copyLink' }), [dispatch]);
  return useMemo(() => ({ openDialog, closeDialog }), [closeDialog, openDialog]);
}
