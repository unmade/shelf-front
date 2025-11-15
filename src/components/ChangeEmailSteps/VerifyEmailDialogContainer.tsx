import { VerifyEmailDialog } from 'components/EmailVerification';

import { useCompleteEmailChange } from './useCompleteEmailChange';

interface Props {
  email: string;
  open: boolean;
  onClose: () => void;
}

export default function VerifyEmailDialogContainer({ email, open, onClose }: Props) {
  const verification = useCompleteEmailChange({ email });

  return <VerifyEmailDialog email={email} open={open} onClose={onClose} {...verification} />;
}
