import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { IFile } from 'types/files';

import DeleteDialog from './DeleteDialog';

interface ContextValue {
  openDialog: (files: IFile[]) => void;
}

export const DeleteDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  files: IFile[];
  visible: boolean;
}

const initialState: State = { files: [], visible: false };

function DeleteDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (files: IFile[]) => {
      setState({ files, visible: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { files, visible } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteDialogContext.Provider value={value}>
      <DeleteDialog visible={visible} files={files} onClose={closeDialog} />
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
