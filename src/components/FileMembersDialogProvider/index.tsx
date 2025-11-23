import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import FileMembersDialog from './FileMembersDialog';

interface ContextValue {
  openDialog: (fileId: string) => void;
}

export const FileMembersDialogContext = createContext<ContextValue | null>(null);

interface State {
  open: boolean;
  fileId?: string;
}

const initialState: State = { open: false, fileId: undefined };

interface Props {
  children: React.ReactNode;
}

function FileMembersDialogProvider({ children }: Props) {
  const [state, setState] = useState(initialState);

  const openDialog = useCallback(
    (fileId: string) => {
      setState({ open: true, fileId });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { fileId, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <FileMembersDialogContext.Provider value={value}>
      <FileMembersDialog fileId={fileId} open={open} onClose={closeDialog} />
      {children}
    </FileMembersDialogContext.Provider>
  );
}

export default FileMembersDialogProvider;

export function useFileMembersDialog(): ContextValue {
  const value = useContext(FileMembersDialogContext);
  if (value == null) {
    throw new Error('`useFileMembersDialog` must be used within a `FileMembersDialogProvider`');
  }
  return value;
}
