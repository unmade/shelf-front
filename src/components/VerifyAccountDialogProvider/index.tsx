import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { useGetCurrentAccountQuery } from 'store/accounts';

import CompleteEmailVerificationSteps from 'components/CompleteEmailVerificationSteps';
import ChangeEmailSteps from 'components/ChangeEmailSteps';

interface ContextValue {
  openDialog: () => void;
}

const Context = createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function VerifyAccountDialogProvider({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const { email, verified } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
      verified: data?.verified,
    }),
  });

  const openDialog = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeDialog = useCallback(
    (open: boolean) => {
      if (!open) {
        setOpen(false);
      }
    },
    [setOpen],
  );

  const value = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <Context.Provider value={value}>
      {!email && <ChangeEmailSteps open={open} onOpenChange={closeDialog} />}
      {!!email && !verified && (
        <CompleteEmailVerificationSteps email={email} open={open} onOpenChange={closeDialog} />
      )}
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
