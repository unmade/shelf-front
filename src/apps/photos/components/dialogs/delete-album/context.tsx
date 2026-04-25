import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IAlbum } from '@/types/photos';

import { DeleteAlbumDialog } from './dialog';

interface ContextValue {
  openDialog: (album: IAlbum) => void;
}

const DeleteAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  album: IAlbum | null;
  open: boolean;
}

const initialState: State = { album: null, open: false };

export function DeleteAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((album: IAlbum) => {
    setState({ album, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteAlbumDialogContext.Provider value={value}>
      <DeleteAlbumDialog open={state.open} album={state.album} onClose={closeDialog} />
      {children}
    </DeleteAlbumDialogContext.Provider>
  );
}

export function useDeleteAlbumDialog(): ContextValue {
  const value = useContext(DeleteAlbumDialogContext);
  if (value == null) {
    throw new Error('`useDeleteAlbumDialog` must be used within a `DeleteAlbumDialogProvider`');
  }
  return value;
}
