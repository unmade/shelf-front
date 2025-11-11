import type React from 'react';
import { useState } from 'react';

import { isEmail } from 'validator';

import { useChangeEmailStartMutation } from 'store/accounts';

import Button from 'components/ui/Button';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from 'components/ui/Dialog';
import { Field, ErrorMessage, Label } from 'components/ui/Field';
import Input from 'components/ui/Input';

interface Props {
  open: boolean;
  onSubmit: (email: string) => void;
  onSkip: () => void;
}

export default function SetEmailForm({ open, onSubmit, onSkip }: Props) {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [changeEmailStart, { isLoading: loading }] = useChangeEmailStartMutation();

  const validate = () => {
    if (!isEmail(email ?? '')) {
      setError('Invalid e-mail address');
      return false;
    }
    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await changeEmailStart(email!).unwrap();
      onSubmit(email!);
    } catch (err) {
      const {
        // @ts-expect-error no annotation for error
        data: { code },
      } = err;
      if (code === 'EMAIL_ALREADY_TAKEN') {
        setError('Account with that email already exists');
      }
      if (code === 'EMAIL_UPDATE_LIMIT_REACHED') {
        setError('Please wait at least 6 hours before changing email again');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onSkip}>
      <DialogTitle>Email verification</DialogTitle>
      <DialogDescription>Verify your email address to access all features</DialogDescription>
      <DialogBody>
        <Field>
          <Label>E-mail address</Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g. user@example.com"
            invalid={!!error}
            onChange={handleChange}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Field>
      </DialogBody>
      <DialogActions>
        <Button className="w-full" variant="plain" color="gray" onClick={onSkip}>
          Skip
        </Button>
        <Button
          type="submit"
          className="w-full"
          variant="primary"
          disabled={loading || error != null}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
