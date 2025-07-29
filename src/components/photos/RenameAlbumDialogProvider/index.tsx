import type React from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

import type { IAlbum } from 'types/photos';

import RenameAlbumDialogContainer from './RenameAlbumDialogContainer';

interface ContextValue {
  openDialog: (album: IAlbum) => void;
}

export const RenameAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  album: IAlbum | null;
  visible: boolean;
}
const initialState: State = { album: null, visible: false };

export default function RenameAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (album: IAlbum) => {
      setState({ album, visible: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { album, visible } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <RenameAlbumDialogContext.Provider value={value}>
      <RenameAlbumDialogContainer visible={visible} album={album} onClose={closeDialog} />
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
