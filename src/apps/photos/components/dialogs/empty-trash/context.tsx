import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { EmptyTrashDialogContainer } from './dialog';

interface ContextValue {
  openDialog: () => void;
}

const EmptyTrashDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export function EmptyTrashDialogProvider({ children }: Props) {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <EmptyTrashDialogContext.Provider value={value}>
      <EmptyTrashDialogContainer open={open} onClose={closeDialog} />
      {children}
    </EmptyTrashDialogContext.Provider>
  );
}

export function useEmptyTrashDialog(): ContextValue {
  const value = useContext(EmptyTrashDialogContext);
  if (value == null) {
    throw new Error('`useEmptyTrashDialog` must be used within a `EmptyTrashDialogProvider`');
  }
  return value;
}
