import { VerifyEmailDialog } from 'components/EmailVerification';

import { useCompleteEmailChange } from './useCompleteEmailChange';

interface Props {
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VerifyEmailDialogContainer({ email, open, onOpenChange }: Props) {
  const verification = useCompleteEmailChange({ email });

  return (
    <VerifyEmailDialog email={email} open={open} onOpenChange={onOpenChange} {...verification} />
  );
}
