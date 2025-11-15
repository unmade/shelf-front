import { VerifyEmailDialog } from 'components/EmailVerification';
import { useVerifyEmail } from 'components/EmailVerification/useVerifyEmail';

interface Props {
  email: string;
  open: boolean;
  onClose: () => void;
}

export default function VerifyEmailDialogContainer({ email, open, onClose }: Props) {
  const verification = useVerifyEmail();

  return <VerifyEmailDialog email={email} open={open} onClose={onClose} {...verification} />;
}
