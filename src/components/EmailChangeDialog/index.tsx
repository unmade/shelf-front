import { useCallback, useState } from 'react';

import Dialog from 'components/ui-legacy/Dialog';

import SetEmailForm from './SetEmailForm';
import VerifyEmailForm from './VerifyEmailForm';

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface State {
  email: string | null;
  setEmailStep: 'todo' | 'done';
  verifyEmailStep: 'todo' | 'done';
}

const initialState: State = {
  email: null,
  setEmailStep: 'todo',
  verifyEmailStep: 'todo',
};

export default function ChangeEmailDialog({ visible, onClose }: Props) {
  const [state, setState] = useState<State>(initialState);

  const onSetEmail = useCallback(
    (email: string) => {
      setState({ ...state, email, setEmailStep: 'done' });
    },
    [state, setState],
  );

  return (
    <Dialog title="" visible={visible} onCancel={onClose} hideActions>
      <div className="p-4 pt-4 lg:-ml-4">
        {state.setEmailStep !== 'done' && <SetEmailForm onSubmit={onSetEmail} onSkip={onClose} />}
        {state.email && state.setEmailStep === 'done' && (
          <VerifyEmailForm email={state.email} onSubmit={onClose} />
        )}
      </div>
    </Dialog>
  );
}
