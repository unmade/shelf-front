import React, { createContext, useContext, useState } from 'react';

import EmptyTrashDialog from './EmptyTrashDialog';

export const EmptyTrashDialogContext = createContext({ openDialog: () => {} });

function EmptyTrashDialogProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const openDialog = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  return (
    <EmptyTrashDialogContext.Provider value={{ openDialog }}>
      <EmptyTrashDialog visible={visible} onClose={closeDialog} />
      {children}
    </EmptyTrashDialogContext.Provider>
  );
}

export default EmptyTrashDialogProvider;

export function useEmptyTrashDialog() {
  const { openDialog } = useContext(EmptyTrashDialogContext);
  return openDialog;
}
