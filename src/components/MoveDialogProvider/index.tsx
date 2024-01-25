import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { IFile } from 'types/files';

import MoveDialog from './MoveDialog';

interface ContextValue {
  openDialog: (files: IFile[]) => void;
}

export const MoveDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  files: IFile[];
  visible: boolean;
}

const initialState: State = { files: [], visible: false };

function MoveDialogProvider({ children }: Props) {
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
    <MoveDialogContext.Provider value={value}>
      <MoveDialog visible={visible} files={files} onClose={closeDialog} />
      {children}
    </MoveDialogContext.Provider>
  );
}

export default MoveDialogProvider;

export function useMoveDialog(): ContextValue {
  const value = useContext(MoveDialogContext);
  if (value == null) {
    throw new Error('`useMoveDialog` must be used within a `MoveDialogProvider`');
  }
  return value;
}
