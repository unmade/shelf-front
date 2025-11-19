import { Trans, useTranslation } from 'react-i18next';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/ui/field';
import { Input } from '@/ui/input';
import { Strong } from '@/ui/text';

import { useCountdown } from './useCountdown';

interface ResendDescriptionProps {
  debounce?: number;
  disabled?: boolean;
  onClick: () => void;
}

function Resend({ debounce = 59, disabled = false, onClick }: ResendDescriptionProps) {
  const { t } = useTranslation('email-verification');

  const { countdown, restart } = useCountdown(debounce);

  const handleResend = () => {
    onClick();
    restart();
  };

  if (countdown) {
    return (
      <Trans
        i18nKey="email-verification:otp-field.resend.wait-n-seconds-to-resend"
        t={t}
        count={countdown}
      >
        Resend new code in <Strong>{countdown}</Strong> seconds
      </Trans>
    );
  }

  return (
    <span className="flex items-center gap-2 sm:gap-1">
      {t("email-verification:otp-field.didn't-receive", {
        defaultValue: "Didn't receive the code?",
      })}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-600 dark:text-indigo-500 dark:hover:text-indigo-400"
        onClick={handleResend}
        disabled={disabled}
      >
        <Strong>
          {t('email-verification:otp-field.button-resend', { defaultValue: 'Resend' })}
        </Strong>
      </button>
    </span>
  );
}

type OTPInputProps = Omit<
  React.ComponentProps<'input'>,
  'inputMode' | 'pattern' | 'minLength' | 'maxLength' | 'min' | 'max'
>;

function OTPInput(props: OTPInputProps) {
  return (
    <Input
      inputMode="numeric"
      pattern="[0-9]*"
      minLength={6}
      maxLength={6}
      min="6"
      max="6"
      {...props}
    />
  );
}

interface OTPFieldProps {
  name?: string;
  error: string | null;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResend: () => void;
  resending: boolean;
}

export function OTPField({ name, error, onInputChange, onResend, resending }: OTPFieldProps) {
  const { t } = useTranslation('email-verification');

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>
        {t('email-verification:otp-field.label', { defaultValue: 'Enter the 6-digit code' })}
      </FieldLabel>
      <OTPInput id={name} name={name} aria-invalid={!!error} onChange={onInputChange} />
      {error && <FieldError>{error}</FieldError>}
      <FieldDescription>
        <Resend onClick={onResend} disabled={resending} />
      </FieldDescription>
    </Field>
  );
}
