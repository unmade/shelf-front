import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from '@/types/files';

import { RenameFileDialog } from './dialog';

interface ContextValue {
  openDialog: (file: IFile) => void;
}

const RenameFileDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  file: IFile | null;
  open: boolean;
}

const initialState: State = { file: null, open: false };

export function RenameFileDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((file: IFile) => {
    setState({ file, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const { file, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <RenameFileDialogContext.Provider value={value}>
      <RenameFileDialog file={file} open={open} onClose={closeDialog} />
      {children}
    </RenameFileDialogContext.Provider>
  );
}

export function useRenameFileDialog(): ContextValue {
  const value = useContext(RenameFileDialogContext);
  if (value == null) {
    throw new Error('`useRenameFileDialog` must be used within a `RenameFileDialogProvider`');
  }
  return value;
}
