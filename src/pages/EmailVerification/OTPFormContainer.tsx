import { useNavigate } from 'react-router';

import { useAppDispatch } from 'hooks';
import useDefaultApp from 'hooks/available-apps';

import {
  useGetCurrentAccountQuery,
  useVerifyEmailCompleteMutation,
  useVerifyEmailSendCodeMutation,
} from 'store/accounts';
import { addToast } from 'store/toasts';

import OTPForm from 'components/OTPForm';

export default function OTPFormContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultApp = useDefaultApp();

  const { email, verified } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
      verified: data?.verified,
    }),
  });

  const [sendCode, { isLoading: resending }] = useVerifyEmailSendCodeMutation();
  const [verifyEmail, { isLoading: submitting }] = useVerifyEmailCompleteMutation();

  if (verified) {
    navigate(defaultApp.path);
  }

  const onSubmit = async (code: string) => {
    try {
      const { completed: success } = await verifyEmail(code).unwrap();
      if (success) {
        navigate(defaultApp.path);
      } else {
        dispatch(
          addToast({
            title: 'Invalid code',
            description: "Check the code you've entered is correct",
          }),
        );
      }
    } catch {
      /* empty */
    }
  };

  const onResend = async () => {
    try {
      await sendCode(undefined).unwrap();
    } catch (err) {
      // @ts-expect-error no annotation for error
      const { data } = err;
      if (data.code === 'OTP_CODE_ALREADY_SENT') {
        dispatch(
          addToast({
            title: 'OTP code sent',
            description:
              'Use code that was sent to you or wait until it expires and request a new one',
          }),
        );
      }
    }
  };

  return (
    <OTPForm
      submitting={submitting}
      resending={resending}
      email={email!}
      onSubmit={onSubmit}
      onResend={onResend}
    />
  );
}
