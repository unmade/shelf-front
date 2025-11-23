import type React from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

import type { IAlbum } from 'types/photos';

import RenameAlbumDialog from './RenameAlbumDialog';

interface ContextValue {
  openDialog: (album: IAlbum) => void;
}

export const RenameAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  album: IAlbum | null;
  open: boolean;
}
const initialState: State = { album: null, open: false };

export default function RenameAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (album: IAlbum) => {
      setState({ album, open: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { album, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <RenameAlbumDialogContext.Provider value={value}>
      <RenameAlbumDialog open={open} album={album} onClose={closeDialog} />
      {children}
    </RenameAlbumDialogContext.Provider>
  );
}

export function useRenameAlbumDialog(): ContextValue {
  const value = useContext(RenameAlbumDialogContext);
  if (value == null) {
    throw new Error('`useRenameAlbumDialog` must be used within a `RenameAlbumDialogContext`');
  }
  return value;
}
