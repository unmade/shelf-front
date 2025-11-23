import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from 'types/files';

import InformationDialog from './InformationDialog';

interface ContextValue {
  openDialog: (file: IFile) => void;
}

export const InformationDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  file: IFile | null;
  open: boolean;
}

const initialState: State = { file: null, open: false };

export default function InformationDialogProvider({ children }: Props) {
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

  const { open, file } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <InformationDialogContext.Provider value={value}>
      <InformationDialog open={open} file={file} onClose={closeDialog} />
      {children}
    </InformationDialogContext.Provider>
  );
}

export function useInformationDialogContext(): ContextValue {
  const value = useContext(InformationDialogContext);
  if (value == null) {
    throw new Error(
      '`useInformationDialogContext` must be used within a `InformationDialogProvider`',
    );
  }
  return value;
}
