import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IAlbum } from '@/types/photos';

import { RenameAlbumDialog } from './dialog';

interface ContextValue {
  openDialog: (album: IAlbum) => void;
}

const RenameAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  album: IAlbum | null;
  open: boolean;
}

const initialState: State = { album: null, open: false };

export function RenameAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((album: IAlbum) => {
    setState({ album, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <RenameAlbumDialogContext.Provider value={value}>
      <RenameAlbumDialog open={state.open} album={state.album} onClose={closeDialog} />
      {children}
    </RenameAlbumDialogContext.Provider>
  );
}

export function useRenameAlbumDialog(): ContextValue {
  const value = useContext(RenameAlbumDialogContext);
  if (value == null) {
    throw new Error('`useRenameAlbumDialog` must be used within a `RenameAlbumDialogProvider`');
  }
  return value;
}
