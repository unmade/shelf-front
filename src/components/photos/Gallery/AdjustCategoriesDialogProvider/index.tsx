import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import AdjustCategoriesDialog from './AdjustCategoriesDialog';

interface ContextValue {
  openDialog: (mediaItemId: string) => void;
}

const AdjustCategoriesDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  mediaItemId: string | null;
  open: boolean;
}

const initialState: State = { mediaItemId: null, open: false };

export default function AdjustCategoriesDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback((mediaItemId: string) => {
    setState({ mediaItemId, open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const { open, mediaItemId } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <AdjustCategoriesDialogContext.Provider value={value}>
      <AdjustCategoriesDialog open={open} mediaItemId={mediaItemId} onClose={closeDialog} />
      {children}
    </AdjustCategoriesDialogContext.Provider>
  );
}

export function useAdjustCategoriesDialogContext(): ContextValue {
  const value = useContext(AdjustCategoriesDialogContext);
  if (value == null) {
    throw new Error(
      '`useAdjustCategoriesDialogContext` must be used within a `AdjustCategoriesDialogProvider`',
    );
  }
  return value;
}
