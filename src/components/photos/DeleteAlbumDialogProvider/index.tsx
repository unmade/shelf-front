import type React from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

import type { IAlbum } from 'types/photos';

import DeleteAlbumDialog from './DeleteAlbumDialog';

interface ContextValue {
  openDialog: (album: IAlbum) => void;
}

export const DeleteAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  open: boolean;
  album: IAlbum | null;
}
const initialState: State = { open: false, album: null };

export default function DeleteAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (album: IAlbum) => {
      setState({ open: true, album });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { open, album } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteAlbumDialogContext.Provider value={value}>
      <DeleteAlbumDialog open={open} album={album} onClose={closeDialog} />
      {children}
    </DeleteAlbumDialogContext.Provider>
  );
}

export function useDeleteAlbumDialog(): ContextValue {
  const value = useContext(DeleteAlbumDialogContext);
  if (value == null) {
    throw new Error('`useDeleteAlbumDialog` must be used within a `DeleteAlbumDialogContext`');
  }
  return value;
}
