import React, { createContext, useContext, useMemo, useState } from 'react';

import EmptyTrashDialogContainer from './EmptyTrashDialogContainer';

interface ContextValue {
  openDialog: () => void;
}

const EmptyTrashDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function EmptyMediaItemsTrashDialogProvider({ children }: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  const openDialog = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <EmptyTrashDialogContext.Provider value={value}>
      <EmptyTrashDialogContainer visible={visible} onClose={closeDialog} />
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
