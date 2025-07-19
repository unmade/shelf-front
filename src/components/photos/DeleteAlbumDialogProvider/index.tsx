import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

import { IAlbum } from 'types/photos';

import DeleteAlbumDialog from './DeleteAlbumDialog';

interface ContextValue {
  openDialog: (album: IAlbum) => void;
}

export const DeleteAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  visible: boolean;
  album: IAlbum | null;
}
const initialState: State = { visible: false, album: null };

export default function DeleteAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (album: IAlbum) => {
      setState({ visible: true, album });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { visible, album } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteAlbumDialogContext.Provider value={value}>
      <DeleteAlbumDialog visible={visible} album={album} onClose={closeDialog} />
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
