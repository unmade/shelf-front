import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from '@/types/photos';

import { DeleteMediaItemsImmediatelyDialog } from './dialog';

interface ContextValue {
  openDialog: (mediaItems: IMediaItem[]) => void;
}

const DeleteImmediatelyDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  mediaItems: IMediaItem[];
  open: boolean;
}

const initialState: State = { mediaItems: [], open: false };

export function DeleteMediaItemsImmediatelyDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((mediaItems: IMediaItem[]) => {
    setState({ mediaItems, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteImmediatelyDialogContext.Provider value={value}>
      <DeleteMediaItemsImmediatelyDialog
        open={state.open}
        mediaItems={state.mediaItems}
        onClose={closeDialog}
      />
      {children}
    </DeleteImmediatelyDialogContext.Provider>
  );
}

export function useDeleteMediaItemsImmediatelyDialog(): ContextValue {
  const value = useContext(DeleteImmediatelyDialogContext);
  if (value == null) {
    throw new Error(
      '`useDeleteMediaItemsImmediatelyDialog` must be used within a `DeleteMediaItemsImmediatelyDialogProvider`',
    );
  }
  return value;
}
