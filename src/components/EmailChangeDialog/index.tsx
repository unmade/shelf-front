import { useCallback, useState } from 'react';

import SetEmailForm from './SetEmailForm';
import VerifyEmailForm from './VerifyEmailForm';
import { Dialog } from 'components/ui/Dialog';

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

  if (state.setEmailStep !== 'done') {
    return <SetEmailForm open={visible} onSubmit={onSetEmail} onSkip={onClose} />;
  } else if (state.email && state.setEmailStep === 'done') {
    return (
      <Dialog open={visible} onClose={onClose}>
        <VerifyEmailForm email={state.email} onSubmit={onClose} />
      </Dialog>
    );
  } else {
    return null;
  }
}
