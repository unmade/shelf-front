import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import EmptyTrashDialogContainer from './EmptyTrashDialogContainer';

interface ContextValue {
  openDialog: () => void;
}

const EmptyTrashDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function EmptyMediaItemsTrashDialogProvider({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);

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

export function useEmptyMediaItemsTrashDialog() {
  const value = useContext(EmptyTrashDialogContext);
  if (value == null) {
    throw new Error(
      '`useEmptyMediaItemsTrashDialog` must be used within a `EmptyMediaItemsTrashDialogProvider`',
    );
  }
  return value;
}
