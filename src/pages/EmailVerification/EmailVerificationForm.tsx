import { useTranslation } from 'react-i18next';

import Button from 'components/ui/Button';
import Heading from 'components/ui/Heading';
import { Strong, Text } from 'components/ui/Text';

import AppLogo from 'components/AppLogo';
import { useVerifyEmail, OTPField } from 'components/EmailVerification';

interface Props {
  email: string;
  onSkip?: () => void;
}

export default function EmailVerificationForm({ email, onSkip }: Props) {
  const { t } = useTranslation('email-verification');

  const { verifying, resending, error, otpInputName, onInputChange, onSubmit, onResend } =
    useVerifyEmail();

  return (
    <form className="grid w-full max-w-sm grid-cols-1 gap-8" onSubmit={onSubmit}>
      <AppLogo />
      <Heading>
        {t('email-verification:page.title', { defaultValue: 'Email verification' })}
      </Heading>
      <Text>
        {t('email-verification:page.description', { defaultValue: "We've sent a code to" })}{' '}
        <Strong>{email}</Strong>
      </Text>
      <OTPField
        name={otpInputName}
        error={error}
        onInputChange={onInputChange}
        onResend={onResend}
        resending={resending}
      />
      <Button type="submit" className="mt-4" disabled={verifying}>
        {t('email-verification:page.button-verify', { defaultValue: 'Verify' })}
      </Button>
      <Button variant="plain" color="gray" onClick={onSkip}>
        {t('email-verification:page.button-skip', { defaultValue: 'Skip' })}
      </Button>
    </form>
  );
}
