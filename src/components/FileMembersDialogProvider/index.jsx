import React, { createContext, useContext, useState } from 'react';

import FileMembersDialog from './FileMembersDialog';

export const FileMembersDialogContext = createContext({ openDialog: () => {} });

const initialState = { visible: false, fileId: null };

function FileMembersDialogProvider({ children }) {
  const [state, setState] = useState(initialState);

  const openDialog = (fileId) => {
    setState({ visible: true, fileId });
  };

  const closeDialog = () => {
    setState(initialState);
  };

  const { fileId, visible } = state;

  return (
    <FileMembersDialogContext.Provider value={{ openDialog }}>
      <FileMembersDialog fileId={fileId} visible={visible} onClose={closeDialog} />
      {children}
    </FileMembersDialogContext.Provider>
  );
}

export default FileMembersDialogProvider;

export function useFileMembersDialog() {
  const { openDialog } = useContext(FileMembersDialogContext);
  return openDialog;
}
