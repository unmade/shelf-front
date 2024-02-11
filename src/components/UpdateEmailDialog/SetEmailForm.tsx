import React, { useState } from 'react';

import { isEmail } from 'validator';

import { useChangeEmailStartMutation } from 'store/accounts';

import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

interface Props {
  onSubmit: (email: string) => void;
  onSkip: () => void;
}

export default function SetEmailForm({ onSubmit, onSkip }: Props) {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    }
  };

  return (
    <div className="text-center text-gray-700 dark:text-zinc-200 lg:min-w-80">
      <div className="text-2xl font-semibold">Email verification</div>
      <div className="mt-2">Verify your email to access all features</div>

      <form className="mt-6 space-y-6 text-left" onSubmit={handleSubmit}>
        <Input
          id="email"
          type="email"
          error={error}
          placeholder="E-mail address"
          onChange={handleChange}
        />
        <div className="w-full px-9">
          <Button variant="primary" size="base" onClick={handleSubmit} loading={loading} full>
            Continue
          </Button>
        </div>
      </form>

      <div className="mt-2 flex items-center justify-center text-sm">
        <Button variant="text" onClick={onSkip}>
          Skip
        </Button>
      </div>
    </div>
  );
}
