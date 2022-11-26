import React, { createContext, useContext, useState } from 'react';

import DeleteDialog from './DeleteDialog';

export const DeleteDialogContext = createContext({ openDialog: () => {} });

function DeleteDialogProvider({ children }) {
  const [state, setState] = useState({ visible: false, files: [] });

  const openDialog = (files) => {
    setState({ visible: true, files });
  };

  const closeDialog = () => {
    setState({ visible: false, files: [] });
  };

  const { visible, files } = state;

  return (
    <DeleteDialogContext.Provider value={{ openDialog }}>
      <DeleteDialog visible={visible} files={files} onClose={closeDialog} />
      {children}
    </DeleteDialogContext.Provider>
  );
}

export default DeleteDialogProvider;

export function useDeleteDialog() {
  const { openDialog } = useContext(DeleteDialogContext);
  return openDialog;
}
