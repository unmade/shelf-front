import { VerifyEmailDialog } from 'components/EmailVerification';
import { useVerifyEmail } from 'components/EmailVerification/useVerifyEmail';

interface Props {
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VerifyEmailDialogContainer({ email, open, onOpenChange }: Props) {
  const verification = useVerifyEmail();

  return (
    <VerifyEmailDialog email={email} open={open} onOpenChange={onOpenChange} {...verification} />
  );
}
