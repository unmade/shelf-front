import React, { createContext, useContext, useState } from 'react';

import CopyLinkDialog from './CopyLinkDialog';

export const CopyLinkDialogContext = createContext({ openDialog: () => {} });

const initialState = { visible: false, file: null };

function CopyLinkDialogProvider({ children }) {
  const [state, setState] = useState(initialState);

  const openDialog = (file) => {
    setState({ visible: true, file });
  };

  const closeDialog = () => {
    setState(initialState);
  };

  const { file, visible } = state;

  return (
    <CopyLinkDialogContext.Provider value={{ openDialog }}>
      <CopyLinkDialog file={file} visible={visible} onClose={closeDialog} />
      {children}
    </CopyLinkDialogContext.Provider>
  );
}

export default CopyLinkDialogProvider;

export function useCopyLinkDialog() {
  const { openDialog } = useContext(CopyLinkDialogContext);
  return openDialog;
}
