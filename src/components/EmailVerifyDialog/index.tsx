import React, { useCallback, useState } from 'react';

import Dialog from 'components/ui/Dialog';

import VerifyEmailForm from './VerifyEmailForm';
import EmailVerificationDisclaimer from './Disclaimer';

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface State {
  disclaimerStep: 'todo' | 'done';
  verifyEmailStep: 'todo' | 'done';
}

const initialState: State = {
  disclaimerStep: 'todo',
  verifyEmailStep: 'todo',
};

export default function VerifyEmailDialog({ visible, onClose }: Props) {
  const [state, setState] = useState<State>(initialState);

  const onDisclaimerContinue = useCallback(() => {
    setState({ ...state, disclaimerStep: 'done' });
  }, [state, setState]);

  return (
    <Dialog title="" visible={visible} onCancel={onClose} hideActions>
      <div className="p-4 pt-4 lg:-ml-4">
        {state.disclaimerStep === 'todo' && (
          <EmailVerificationDisclaimer onSubmit={onDisclaimerContinue} onSkip={onClose} />
        )}
        {state.disclaimerStep === 'done' && <VerifyEmailForm onSubmit={onClose} />}
      </div>
    </Dialog>
  );
}
