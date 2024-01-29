import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { IMediaItem } from 'types/photos';

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
  visible: boolean;
}

const initialState: State = { mediaItems: [], visible: false };

export default function DeleteMediaItemsDialogProvider({ children }: Props) {
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
    <DeleteDialogContext.Provider value={value}>
      <DeleteDialogContainer visible={visible} mediaItems={mediaItems} onClose={closeDialog} />
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
