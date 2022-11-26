import React, { createContext, useContext, useState } from 'react';

import CreateFolderDialog from './CreateFolderDialog';

export const CreateFolderDialogContext = createContext({ openDialog: () => {} });

function CreateFolderDialogProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const openDialog = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  return (
    <CreateFolderDialogContext.Provider value={{ openDialog }}>
      <CreateFolderDialog visible={visible} onClose={closeDialog} />
      {children}
    </CreateFolderDialogContext.Provider>
  );
}

export default CreateFolderDialogProvider;

export function useCreateFolderDialog() {
  const { openDialog } = useContext(CreateFolderDialogContext);
  return openDialog;
}
