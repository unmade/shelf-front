import React from 'react';

import Dialog from 'components/ui/Dialog';

import VerifyEmailForm from './VerifyEmailForm';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function VerifyEmailDialog({ visible, onClose }: Props) {
  return (
    <Dialog title="" visible={visible} onCancel={onClose} hideActions>
      <div className="p-4 pt-4 lg:-ml-4">
        <VerifyEmailForm onSubmit={onClose} />
      </div>
    </Dialog>
  );
}
