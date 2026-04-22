import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from '@/types/photos';

import InformationDialog from './InformationDialog';

interface ContextValue {
  openDialog: (mediaItem: IMediaItem) => void;
}

const InformationDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  mediaItem: IMediaItem | null;
  open: boolean;
}

const initialState: State = { mediaItem: null, open: false };

export default function InformationDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(
    (mediaItem: IMediaItem) => {
      setState({ mediaItem, open: true });
    },
    [setState],
  );

  const closeDialog = () => {
    setState(initialState);
  };

  const { open, mediaItem } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <InformationDialogContext.Provider value={value}>
      <InformationDialog open={open} mediaItem={mediaItem} onClose={closeDialog} />
      {children}
    </InformationDialogContext.Provider>
  );
}

export function useInformationDialogContext(): ContextValue {
  const value = useContext(InformationDialogContext);
  if (value == null) {
    throw new Error(
      '`useInformationDialogContext` must be used within a `InformationDialogProvider`',
    );
  }
  return value;
}
