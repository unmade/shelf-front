import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { FileMembersDialog } from './dialog';

interface ContextValue {
  openDialog: (fileId: string) => void;
}

const FileMembersDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  open: boolean;
  fileId?: string;
}

const initialState: State = { open: false, fileId: undefined };

export function FileMembersDialogProvider({ children }: Props) {
  const [state, setState] = useState(initialState);

  const openDialog = useCallback((fileId: string) => {
    setState({ open: true, fileId });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const { fileId, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <FileMembersDialogContext.Provider value={value}>
      <FileMembersDialog fileId={fileId} open={open} onClose={closeDialog} />
      {children}
    </FileMembersDialogContext.Provider>
  );
}

export function useFileMembersDialog(): ContextValue {
  const value = useContext(FileMembersDialogContext);
  if (value == null) {
    throw new Error('`useFileMembersDialog` must be used within a `FileMembersDialogProvider`');
  }
  return value;
}
