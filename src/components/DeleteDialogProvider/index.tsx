import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from 'types/files';

import DeleteDialogContainer from './DeleteDialogContainer';

interface ContextValue {
  openDialog: (files: IFile[]) => void;
}

export const DeleteDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  files: IFile[];
  open: boolean;
}

const initialState: State = { files: [], open: false };

function DeleteDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (files: IFile[]) => {
      setState({ files, open: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { files, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteDialogContext.Provider value={value}>
      <DeleteDialogContainer open={open} files={files} onClose={closeDialog} />
      {children}
    </DeleteDialogContext.Provider>
  );
}

export default DeleteDialogProvider;

export function useDeleteDialog(): ContextValue {
  const value = useContext(DeleteDialogContext);
  if (value == null) {
    throw new Error('`useDeleteDialog` must be used within a `DeleteDialogProvider`');
  }
  return value;
}
