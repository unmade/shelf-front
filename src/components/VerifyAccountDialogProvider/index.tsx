import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { useGetCurrentAccountQuery } from 'store/accounts';

import ChangeEmailDialog from 'components/EmailChangeDialog';
import VerifyEmailDialog from 'components/EmailVerifyDialog';

interface ContextValue {
  openDialog: () => void;
}

const Context = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

interface State {
  visible: boolean;
}

const initialState: State = { visible: false };

export default function VerifyAccountDialogProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const { email, verified } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
      verified: data?.verified,
    }),
  });

  const openDialog = useCallback(() => {
    setState({ visible: true });
  }, [setState]);

  const closeDialog = () => {
    setState(initialState);
  };

  const { visible } = state;

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <Context.Provider value={value}>
      {!email && <ChangeEmailDialog visible={visible} onClose={closeDialog} />}
      {email && !verified && <VerifyEmailDialog visible={visible} onClose={closeDialog} />}
      {children}
    </Context.Provider>
  );
}

export function useVerifyAccountDialog(): ContextValue {
  const value = useContext(Context);
  if (value == null) {
    throw new Error('`useVerifyAccountDialog` must be used within a `VerifyAccountDialogProvider`');
  }
  return value;
}
