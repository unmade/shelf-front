import React, { createContext, useContext, useMemo, useState } from 'react';

import EmptyTrashDialogContainer from './EmptyTrashDialogContainer';

export const EmptyTrashDialogContext = createContext({ openDialog: () => {} });

function EmptyTrashDialogProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const value = useMemo(() => ({ openDialog }));

  return (
    <EmptyTrashDialogContext.Provider value={value}>
      <EmptyTrashDialogContainer open={open} onClose={closeDialog} />
      {children}
    </EmptyTrashDialogContext.Provider>
  );
}

export default EmptyTrashDialogProvider;

export function useEmptyTrashDialog() {
  const { openDialog } = useContext(EmptyTrashDialogContext);
  return openDialog;
}
