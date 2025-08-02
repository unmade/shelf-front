import Button from 'components/ui-legacy/Button';
import { useVerifyEmailSendCodeMutation } from 'store/accounts';

interface Props {
  onSkip: () => void;
  onSubmit: () => void;
}

export default function EmailVerificationDisclaimer({ onSkip, onSubmit }: Props) {
  const [sendCode, { isLoading: loading }] = useVerifyEmailSendCodeMutation();

  const handleSubmit = async () => {
    try {
      await sendCode(undefined).unwrap();
      onSubmit();
    } catch (err) {
      const {
        // @ts-expect-error no annotation for error
        data: { code },
      } = err;
      if (code === 'OTP_CODE_ALREADY_SENT') {
        onSubmit();
      }
    }
  };

  return (
    <div className="text-center text-gray-700 lg:min-w-80 dark:text-zinc-200">
      <div className="text-2xl font-semibold">Email verification</div>
      <div className="mt-2">Verify your email address to access all features</div>

      <div className="mt-6 space-y-6 text-left">
        <div className="w-full px-9">
          <Button variant="primary" size="base" onClick={handleSubmit} loading={loading} full>
            Continue
          </Button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center text-sm">
        <Button variant="text" onClick={onSkip}>
          Skip
        </Button>
      </div>
    </div>
  );
}
