import { useCallback, useState } from 'react';

import Disclaimer from './Disclaimer';
import VerifyEmailDialogContainer from './VerifyEmailDialogContainer';

interface Props {
  email: string;
  visible: boolean;
  onOpenChange: (open: boolean) => void;
}

enum Step {
  Disclaimer,
  VerifyEmail,
  Completed,
}

export default function CompleteEmailVerificationSteps({ email, visible, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>(Step.Disclaimer);

  const handleDisclaimerContinue = useCallback(() => {
    setStep(Step.VerifyEmail);
  }, [setStep]);

  const onClose = useCallback(
    (open: boolean) => {
      if (!open) {
        setStep(Step.Disclaimer);
      }
      onOpenChange(open);
    },
    [onOpenChange, setStep],
  );

  switch (step) {
    case Step.Disclaimer:
      return (
        <Disclaimer open={visible} onSubmit={handleDisclaimerContinue} onOpenChange={onClose} />
      );
    case Step.VerifyEmail:
      return <VerifyEmailDialogContainer open={visible} email={email} onOpenChange={onClose} />;
    default:
      return null;
  }
}
