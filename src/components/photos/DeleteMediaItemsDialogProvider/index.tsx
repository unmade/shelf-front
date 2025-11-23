import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from 'types/photos';

import DeleteDialogContainer from './DeleteDialogContainer';

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

export default function DeleteMediaItemsDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (mediaItems: IMediaItem[]) => {
      setState({ mediaItems, open: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { mediaItems, open } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DeleteDialogContext.Provider value={value}>
      <DeleteDialogContainer open={open} mediaItems={mediaItems} onClose={closeDialog} />
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
