import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from 'types/photos';

import DeleteImmediatelyDialogContainer from './DeleteImmediatelyDialogContainer';

interface ContextValue {
  openDialog: (mediaItems: IMediaItem[]) => void;
}

const DeleteImmediatelyDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  mediaItems: IMediaItem[];
  visible: boolean;
}

const initialState: State = { mediaItems: [], visible: false };

export default function DeleteMediaItemsImmediatelyDialogProvider({ children }: Props) {
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
    <DeleteImmediatelyDialogContext.Provider value={value}>
      <DeleteImmediatelyDialogContainer
        visible={visible}
        mediaItems={mediaItems}
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
