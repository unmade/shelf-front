import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from '@/types/photos';

import { AddToAlbumDialog } from './dialog';

interface ContextValue {
  openDialog: (mediaItems: IMediaItem[]) => void;
}

const AddToAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  mediaItems: IMediaItem[];
  open: boolean;
}

const initialState: State = { mediaItems: [], open: false };

export function AddToAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((mediaItems: IMediaItem[]) => {
    setState({ mediaItems, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <AddToAlbumDialogContext.Provider value={value}>
      <AddToAlbumDialog open={state.open} mediaItems={state.mediaItems} onClose={closeDialog} />
      {children}
    </AddToAlbumDialogContext.Provider>
  );
}

export function useAddToAlbumDialog(): ContextValue {
  const value = useContext(AddToAlbumDialogContext);
  if (value == null) {
    throw new Error('`useAddToAlbumDialog` must be used within a `AddToAlbumDialogProvider`');
  }
  return value;
}
