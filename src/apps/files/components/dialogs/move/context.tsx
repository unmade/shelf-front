import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from '@/types/files';

import { MoveDialog } from './dialog';

interface ContextValue {
  openDialog: (files: IFile[]) => void;
}

const MoveDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  files: IFile[];
  open: boolean;
}

const initialState: State = { files: [], open: false };

export function MoveDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((files: IFile[]) => {
    setState({ files, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const { files, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <MoveDialogContext.Provider value={value}>
      <MoveDialog open={open} files={files} onClose={closeDialog} />
      {children}
    </MoveDialogContext.Provider>
  );
}

export function useMoveDialog(): ContextValue {
  const value = useContext(MoveDialogContext);
  if (value == null) {
    throw new Error('`useMoveDialog` must be used within a `MoveDialogProvider`');
  }
  return value;
}
