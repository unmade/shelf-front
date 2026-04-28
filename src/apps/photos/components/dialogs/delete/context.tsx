import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from '@/types/photos';

import { DeleteMediaItemsDialog } from './dialog';

interface ContextValue {
  openDialog: (mediaItems: IMediaItem[]) => void;
}

const DeleteDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  mediaItems: IMediaItem[];
  open: boolean;
}

const initialState: State = { mediaItems: [], open: false };

export function DeleteMediaItemsDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((mediaItems: IMediaItem[]) => {
    setState({ mediaItems, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteDialogContext.Provider value={value}>
      <DeleteMediaItemsDialog
        open={state.open}
        mediaItems={state.mediaItems}
        onClose={closeDialog}
      />
      {children}
    </DeleteDialogContext.Provider>
  );
}

export function useDeleteMediaItemsDialog(): ContextValue {
  const value = useContext(DeleteDialogContext);
  if (value == null) {
    throw new Error(
      '`useDeleteMediaItemsDialog` must be used within a `DeleteMediaItemsDialogProvider`',
    );
  }
  return value;
}
