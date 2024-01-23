import React, { createContext, useContext, useState } from 'react';

import AdjustCategoriesDialog from './AdjustCategoriesDialog';

export const AdjustCategoriesDialogContext = createContext({ openDialog: () => {} });

function AdjustCategoriesDialogProvider({ children }) {
  const [state, setState] = useState({ visible: false, fileId: null });

  const openDialog = (fileId) => {
    setState({ visible: true, fileId });
  };

  const closeDialog = () => {
    setState({ visible: false, file: null });
  };

  const { visible, fileId } = state;

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AdjustCategoriesDialogContext.Provider value={{ openDialog }}>
      <AdjustCategoriesDialog visible={visible} fileId={fileId} onClose={closeDialog} />
      {children}
    </AdjustCategoriesDialogContext.Provider>
  );
}

export default AdjustCategoriesDialogProvider;

export function useAdjustCategoriesDialogContext() {
  return useContext(AdjustCategoriesDialogContext);
}
