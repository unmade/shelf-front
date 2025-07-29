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
  visible: boolean;
}

const initialState = { file: null, visible: false };

export default function InformationDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (file: IFile) => {
      setState({ file, visible: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { visible, file } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <InformationDialogContext.Provider value={value}>
      <InformationDialog visible={visible} file={file} onClose={closeDialog} />
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
