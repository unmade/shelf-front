import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { CreateFolderDialog } from './dialog';

interface ContextValue {
  openDialog: (path: string) => void;
}

const CreateFolderDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  path?: string;
  open: boolean;
}

const initialState: State = { path: undefined, open: false };

export function CreateFolderDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((path: string) => {
    setState({ path, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const { path, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <CreateFolderDialogContext.Provider value={value}>
      {path && <CreateFolderDialog inPath={path} open={open} onClose={closeDialog} />}
      {children}
    </CreateFolderDialogContext.Provider>
  );
}

export function useCreateFolderDialog(): ContextValue {
  const value = useContext(CreateFolderDialogContext);
  if (value == null) {
    throw new Error('`useCreateFolderDialog` must be used within a `CreateFolderDialogProvider`');
  }
  return value;
}
