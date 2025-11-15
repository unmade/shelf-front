import { useCallback, useState } from 'react';

import Disclaimer from './Disclaimer';
import VerifyEmailDialogContainer from './VerifyEmailDialogContainer';

interface Props {
  email: string;
  visible: boolean;
  onClose: () => void;
}

enum Step {
  Disclaimer,
  VerifyEmail,
  Completed,
}

export default function CompleteEmailVerificationSteps({ email, visible, onClose }: Props) {
  const [step, setStep] = useState<Step>(Step.Disclaimer);

  const onDisclaimerContinue = useCallback(() => {
    setStep(Step.VerifyEmail);
  }, [setStep]);

  switch (step) {
    case Step.Disclaimer:
      return <Disclaimer open={visible} onSubmit={onDisclaimerContinue} onClose={onClose} />;
    case Step.VerifyEmail:
      return <VerifyEmailDialogContainer open={visible} email={email} onClose={onClose} />;
    default:
      return null;
  }
}
