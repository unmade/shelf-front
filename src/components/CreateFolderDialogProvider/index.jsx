import React, { createContext, useContext, useState } from 'react';

import CreateFolderDialog from './CreateFolderDialog';

export const CreateFolderDialogContext = createContext({ openDialog: () => {} });

function CreateFolderDialogProvider({ children }) {
  const [inPath, setInPath] = useState(null);
  const [visible, setVisible] = useState(false);

  const openDialog = (path) => {
    setInPath(path);
    setVisible(true);
  };

  const closeDialog = () => {
    setInPath(null);
    setVisible(false);
  };

  return (
    <CreateFolderDialogContext.Provider value={{ openDialog }}>
      <CreateFolderDialog inPath={inPath} visible={visible} onClose={closeDialog} />
      {children}
    </CreateFolderDialogContext.Provider>
  );
}

export default CreateFolderDialogProvider;

export function useCreateFolderDialog() {
  const { openDialog } = useContext(CreateFolderDialogContext);
  return openDialog;
}
