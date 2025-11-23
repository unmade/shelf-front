import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from 'types/files';

import RenameFileDialogContainer from './RenameFileDialogContainer';

interface ContextValue {
  openDialog: (files: IFile) => void;
}

export const RenameFileDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  file: IFile | null;
  open: boolean;
}

const initialState: State = { file: null, open: false };

function RenameFileDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (file: IFile) => {
      setState({ file, open: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { file, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <RenameFileDialogContext.Provider value={value}>
      <RenameFileDialogContainer open={open} file={file} onClose={closeDialog} />
      {children}
    </RenameFileDialogContext.Provider>
  );
}

export default RenameFileDialogProvider;

export function useRenameFileDialog(): ContextValue {
  const value = useContext(RenameFileDialogContext);
  if (value == null) {
    throw new Error('`useRenameFileDialog` must be used within a `RenameFileDialogProvider`');
  }
  return value;
}
