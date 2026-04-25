import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { CreateAlbumDialog } from './dialog';

interface ContextValue {
  openDialog: () => void;
}

const CreateAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  open: boolean;
}

const initialState: State = { open: false };

export function CreateAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(() => {
    setState({ open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <CreateAlbumDialogContext.Provider value={value}>
      <CreateAlbumDialog open={state.open} onClose={closeDialog} />
      {children}
    </CreateAlbumDialogContext.Provider>
  );
}

export function useCreateAlbumDialog(): ContextValue {
  const value = useContext(CreateAlbumDialogContext);
  if (value == null) {
    throw new Error('`useCreateAlbumDialog` must be used within a `CreateAlbumDialogProvider`');
  }
  return value;
}
