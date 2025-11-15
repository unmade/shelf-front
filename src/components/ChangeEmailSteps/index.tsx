import { useCallback, useState } from 'react';

import SetEmailDialog from './SetEmailDialog';
import VerifyEmailDialogContainer from './VerifyEmailDialogContainer';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ChangeEmailSteps({ visible, onClose }: Props) {
  const [email, setEmail] = useState<string | null>(null);

  const onSetEmail = useCallback(
    (email: string) => {
      setEmail(email);
    },
    [setEmail],
  );

  if (email == null) {
    return <SetEmailDialog open={visible} onSubmit={onSetEmail} onClose={onClose} />;
  }
  return <VerifyEmailDialogContainer open={visible} email={email} onClose={onClose} />;
}
