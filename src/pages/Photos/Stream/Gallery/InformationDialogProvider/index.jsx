import React, { createContext, useContext, useState } from 'react';

import InformationDialog from './InformationDialog';

export const InformationDialogContext = createContext({ openDialog: () => {} });

function InformationDialogProvider({ children }) {
  const [state, setState] = useState({ visible: false, file: null });

  const openDialog = (file) => {
    setState({ visible: true, file });
  };

  const closeDialog = () => {
    setState({ visible: false, file: null });
  };

  const { visible, file } = state;

  return (
    <InformationDialogContext.Provider value={{ openDialog }}>
      <InformationDialog visible={visible} file={file} onClose={closeDialog} />
      {children}
    </InformationDialogContext.Provider>
  );
}

export default InformationDialogProvider;

export function useInformationDialogContext() {
  const { openDialog } = useContext(InformationDialogContext);
  return openDialog;
}
