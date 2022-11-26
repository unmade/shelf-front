import React, { createContext, useContext, useState } from 'react';

import MoveDialog from './MoveDialog';

export const MoveDialogContext = createContext({ openDialog: () => {} });

function MoveDialogProvider({ children }) {
  const [state, setState] = useState({ visible: false, files: [] });

  const openDialog = (files) => {
    setState({ visible: true, files });
  };

  const closeDialog = () => {
    setState({ visible: false, files: [] });
  };

  const { visible, files } = state;

  return (
    <MoveDialogContext.Provider value={{ openDialog }}>
      <MoveDialog visible={visible} files={files} onClose={closeDialog} />
      {children}
    </MoveDialogContext.Provider>
  );
}

export default MoveDialogProvider;

export function useMoveDialog() {
  const { openDialog } = useContext(MoveDialogContext);
  return openDialog;
}
