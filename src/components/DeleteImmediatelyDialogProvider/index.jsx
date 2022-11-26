import React, { createContext, useContext, useState } from 'react';

import DeleteImmediatelyDialog from './DeleteImmediatelyDialog';

export const DeleteImmediatelyDialogContext = createContext({ openDialog: () => {} });

function DeleteImmediatelyDialogProvider({ children }) {
  const [state, setState] = useState({ visible: false, files: [] });

  const openDialog = (files) => {
    setState({ visible: true, files });
  };

  const closeDialog = () => {
    setState({ visible: false, files: [] });
  };

  const { visible, files } = state;

  return (
    <DeleteImmediatelyDialogContext.Provider value={{ openDialog }}>
      <DeleteImmediatelyDialog visible={visible} files={files} onClose={closeDialog} />
      {children}
    </DeleteImmediatelyDialogContext.Provider>
  );
}

export default DeleteImmediatelyDialogProvider;

export function useDeleteImmediatelyDialog() {
  const { openDialog } = useContext(DeleteImmediatelyDialogContext);
  return openDialog;
}
