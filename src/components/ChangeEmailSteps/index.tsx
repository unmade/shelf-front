import { useCallback, useState } from 'react';

import SetEmailDialog from './SetEmailDialog';
import VerifyEmailDialogContainer from './VerifyEmailDialogContainer';

interface Props {
  visible: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangeEmailSteps({ visible, onOpenChange }: Props) {
  const [email, setEmail] = useState<string | null>(null);

  const handleSetEmail = useCallback(
    (email: string) => {
      setEmail(email);
    },
    [setEmail],
  );

  const handleClose = useCallback(
    (open: boolean) => {
      if (!open) {
        setEmail(null);
      }
      onOpenChange(open);
    },
    [onOpenChange, setEmail],
  );

  if (email == null) {
    return <SetEmailDialog open={visible} onSubmit={handleSetEmail} onOpenChange={handleClose} />;
  }
  return <VerifyEmailDialogContainer open={visible} email={email} onOpenChange={handleClose} />;
}
