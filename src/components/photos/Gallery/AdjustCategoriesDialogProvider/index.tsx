import type React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import AdjustCategoriesDialog from './AdjustCategoriesDialog';

interface ContextValue {
  openDialog: (fileId: string) => void;
}

export const AdjustCategoriesDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  fileId: string | null;
  visible: boolean;
}

const initialState = { fileId: null, visible: false };

export default function AdjustCategoriesDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = (fileId: string) => {
    setState({ fileId, visible: true });
  };

  const closeDialog = () => {
    setState(initialState);
  };

  const { visible, fileId } = state;

  const value = useMemo(() => ({ openDialog }), [setState]);

  return (
    <AdjustCategoriesDialogContext.Provider value={value}>
      <AdjustCategoriesDialog visible={visible} fileId={fileId} onClose={closeDialog} />
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
