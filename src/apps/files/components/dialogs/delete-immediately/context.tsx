import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from '@/types/files';

import { DeleteImmediatelyDialogContainer } from './dialog';

interface ContextValue {
  openDialog: (files: IFile[]) => void;
}

const DeleteImmediatelyDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  files: IFile[];
  open: boolean;
}

const initialState: State = { files: [], open: false };

export function DeleteImmediatelyDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((files: IFile[]) => {
    setState({ files, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const { open, files } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteImmediatelyDialogContext.Provider value={value}>
      <DeleteImmediatelyDialogContainer open={open} files={files} onClose={closeDialog} />
      {children}
    </DeleteImmediatelyDialogContext.Provider>
  );
}

export function useDeleteImmediatelyDialog(): ContextValue {
  const value = useContext(DeleteImmediatelyDialogContext);
  if (value == null) {
    throw new Error(
      '`useDeleteImmediatelyDialog` must be used within a `DeleteImmediatelyDialogProvider`',
    );
  }
  return value;
}
