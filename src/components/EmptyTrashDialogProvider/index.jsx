import React, { createContext, useContext, useMemo, useState } from 'react';

import EmptyTrashDialogContainer from './EmptyTrashDialogContainer';

export const EmptyTrashDialogContext = createContext({ openDialog: () => {} });

function EmptyTrashDialogProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const openDialog = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  const value = useMemo(() => ({ openDialog }));

  return (
    <EmptyTrashDialogContext.Provider value={value}>
      <EmptyTrashDialogContainer visible={visible} onClose={closeDialog} />
      {children}
    </EmptyTrashDialogContext.Provider>
  );
}

export default EmptyTrashDialogProvider;

export function useEmptyTrashDialog() {
  const { openDialog } = useContext(EmptyTrashDialogContext);
  return openDialog;
}
