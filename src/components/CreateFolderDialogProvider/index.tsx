import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

import CreateFolderDialog from './CreateFolderDialog';

interface ContextValue {
  openDialog: (path: string) => void;
}

export const CreateFolderDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  path: string | null;
  visible: boolean;
}
const initialState: State = { path: null, visible: false };

function CreateFolderDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (path: string) => {
      setState({ path, visible: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { path, visible } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <CreateFolderDialogContext.Provider value={value}>
      <CreateFolderDialog inPath={path} visible={visible} onClose={closeDialog} />
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
