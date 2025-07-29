import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from 'types/files';

import DeleteImmediatelyDialogContainer from './DeleteImmediatelyDialogContainer';

interface ContextValue {
  openDialog: (files: IFile[]) => void;
}

export const DeleteImmediatelyDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  files: IFile[];
  visible: boolean;
}

const initialState: State = { files: [], visible: false };

function DeleteImmediatelyDialogProvider({ children }: Props) {
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

  const { visible, files } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteImmediatelyDialogContext.Provider value={value}>
      <DeleteImmediatelyDialogContainer visible={visible} files={files} onClose={closeDialog} />
      {children}
    </DeleteImmediatelyDialogContext.Provider>
  );
}

export default DeleteImmediatelyDialogProvider;

export function useDeleteImmediatelyDialog(): ContextValue {
  const value = useContext(DeleteImmediatelyDialogContext);
  if (value == null) {
    throw new Error(
      '`useDeleteImmediatelyDialog` must be used within a `DeleteImmediatelyDialogProvider`',
    );
  }
  return value;
}
