import React, { useEffect, useRef, useState } from 'react';

import { shallowEqual } from 'react-redux';

import Button from 'components/ui/Button';

import OTPInput from './OTPInput';
import ResendButton from './ResendButton';

interface Props {
  email: string;
  resending: boolean;
  submitting: boolean;
  onResend: () => void;
  onSubmit: (code: string) => void;
}

export default function OTPForm({ email, resending, submitting, onResend, onSubmit }: Props) {
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const makeRef = (element: HTMLInputElement, index: number) => {
    inputsRef.current[index] = element;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    if (value.length === 1 && errors[index]) {
      setErrors({ ...errors, [index]: false });
    }
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && index > 0 && !inputsRef.current[index]?.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const validate = (): boolean => {
    let hasErrors = false;
    const nextErrors = { ...errors };
    inputsRef.current.forEach((el, index) => {
      if (!el?.value) {
        hasErrors = true;
        nextErrors[index] = true;
      }
    });
    if (!shallowEqual(errors, nextErrors)) {
      setErrors(nextErrors);
    }
    return !hasErrors;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    const code = inputsRef.current
      .filter((el) => el)
      .map((el) => el?.value)
      .join('');
    onSubmit(code);
  };

  return (
    <div className="text-center text-gray-700 dark:text-zinc-200">
      <div className="text-2xl font-semibold">Email verification</div>
      <div className="mt-2">
        We&apos;ve sent a code to{' '}
        <a className="text-indigo-600 dark:text-indigo-400" href={`mailto:${email}`}>
          {email}
        </a>
      </div>

      <form className="mt-6 space-y-6" onSubmit={submit}>
        <div className="flex items-center justify-center space-x-2">
          {[...Array(6).keys()].map((index) => (
            <OTPInput
              key={index}
              error={errors[index]}
              innerRef={(el) => makeRef(el, index)}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          ))}
        </div>
        <div className="w-full px-9">
          <Button
            variant="primary"
            size="base"
            loading={submitting}
            disabled={resending}
            onClick={submit}
            full
          >
            Verify
          </Button>
        </div>
      </form>

      <div className="mt-2 flex items-center justify-center text-sm">
        <ResendButton loading={resending} disabled={submitting} onClick={onResend} />
      </div>
    </div>
  );
}
