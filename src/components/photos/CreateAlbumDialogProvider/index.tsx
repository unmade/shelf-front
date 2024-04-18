import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

import CreateAlbumDialog from './CreateAlbumDialog';

interface ContextValue {
  openDialog: () => void;
}

export const CreateAlbumDialogContext = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  visible: boolean;
}
const initialState: State = { visible: false };

export default function CreateAlbumDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const openDialog = useCallback(() => {
    setState({ visible: true });
  }, [setState]);

  const closeDialog = () => {
    setState(initialState);
  };

  const { visible } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <CreateAlbumDialogContext.Provider value={value}>
      <CreateAlbumDialog visible={visible} onClose={closeDialog} />
      {children}
    </CreateAlbumDialogContext.Provider>
  );
}

export function useCreateAlbumDialog(): ContextValue {
  const value = useContext(CreateAlbumDialogContext);
  if (value == null) {
    throw new Error('`useCreateAlbumDialog` must be used within a `CreateAlbumDialogContext`');
  }
  return value;
}
