import type React from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

import CreateFolderDialog from './CreateFolderDialog';

interface ContextValue {
  openDialog: (path: string) => void;
}

export const CreateFolderDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  path?: string;
  open: boolean;
}
const initialState: State = { path: undefined, open: false };

function CreateFolderDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (path: string) => {
      setState({ path, open: true });
    },
    [setState],
  );

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, [setState]);

  const { path, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <CreateFolderDialogContext.Provider value={value}>
      <CreateFolderDialog inPath={path} open={open} onClose={closeDialog} />
      {children}
    </CreateFolderDialogContext.Provider>
  );
}

export default CreateFolderDialogProvider;

export function useCreateFolderDialog(): ContextValue {
  const value = useContext(CreateFolderDialogContext);
  if (value == null) {
    throw new Error('`useCreateFolderDialog` must be used within a `CreateFolderDialogProvider`');
  }
  return value;
}
