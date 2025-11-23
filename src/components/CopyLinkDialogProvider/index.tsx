import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IFile } from 'types/files';

import CopyLinkDialog from './CopyLinkDialog';

interface ContextValue {
  openDialog: (file: IFile) => void;
}

export const CopyLinkDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  file: IFile | null;
  open: boolean;
}

const initialState: State = { file: null, open: false };

export default function CopyLinkDialogProvider({ children }: Props) {
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
    <CopyLinkDialogContext.Provider value={value}>
      <CopyLinkDialog file={file} open={open} onClose={closeDialog} />
      {children}
    </CopyLinkDialogContext.Provider>
  );
}

export function useCopyLinkDialog(): ContextValue {
  const value = useContext(CopyLinkDialogContext);
  if (value == null) {
    throw new Error('`useCopyLinkDialog` must be used within a `CopyLinkDialogProvider`');
  }
  return value;
}
