import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from 'types/photos';

import AddToAlbumDialog from './AddToAlbumDialog';

interface ContextValue {
  openDialog: (mediaItems: IMediaItem[]) => void;
}

const AddToAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  mediaItems: IMediaItem[];
  visible: boolean;
}

const initialState: State = { mediaItems: [], visible: false };

export default function AddToAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (mediaItems: IMediaItem[]) => {
      setState({ mediaItems, visible: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { mediaItems, visible } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <AddToAlbumDialogContext.Provider value={value}>
      <AddToAlbumDialog visible={visible} mediaItems={mediaItems} onClose={closeDialog} />
      {children}
    </AddToAlbumDialogContext.Provider>
  );
}

export function useAddToAlbumDialog(): ContextValue {
  const value = useContext(AddToAlbumDialogContext);
  if (value == null) {
    throw new Error('`useAddToAlbumDialog` must be used within a `AddToAlbumDialogContext`');
  }
  return value;
}
