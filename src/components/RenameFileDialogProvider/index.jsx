import React, { createContext, useContext, useState } from 'react';

import RenameFileDialogContainer from './RenameFileDialogContainer';

export const RenameFileDialogContext = createContext({ openDialog: () => {} });

function RenameFileDialogProvider({ children }) {
  const [state, setState] = useState({ visible: false, file: null });

  const openDialog = (file) => {
    setState({ visible: true, file });
  };

  const closeDialog = () => {
    setState({ visible: false, file: null });
  };

  const { visible, file } = state;

  return (
    <RenameFileDialogContext.Provider value={{ openDialog }}>
      <RenameFileDialogContainer visible={visible} file={file} onClose={closeDialog} />
      {children}
    </RenameFileDialogContext.Provider>
  );
}

export default RenameFileDialogProvider;

export function useRenameFileDialog() {
  const { openDialog } = useContext(RenameFileDialogContext);
  return openDialog;
}
