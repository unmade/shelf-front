import apiSlice from './apiSlice';
import { RootState } from './store';

interface ICurrentAccountSchema {
  id: string;
  username: string;
  email: string | null;
  display_name: string;
  verified: boolean;
  superuser: boolean;
}

const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeEmailComplete: builder.mutation<{ completed: boolean }, string>({
      query: (code) => ({
        url: '/accounts/change_email/complete',
        method: 'POST',
        body: { code },
      }),
      invalidatesTags: [{ type: 'Accounts', id: 'getCurrentAccount' }],
    }),
    changeEmailResendCode: builder.mutation<undefined, undefined>({
      query: () => ({
        url: '/accounts/change_email/resend_code',
        method: 'POST',
      }),
    }),
    changeEmailStart: builder.mutation<undefined, string>({
      query: (email) => ({
        url: '/accounts/change_email/start',
        method: 'POST',
        body: { email },
      }),
    }),
    getCurrentAccount: builder.query<ICurrentAccountSchema, undefined>({
      query: () => 'accounts/get_current',
      providesTags: [{ type: 'Accounts', id: 'getCurrentAccount' }],
    }),
    getSpaceUsage: builder.query({
      query: () => '/accounts/get_space_usage',
    }),
    verifyEmailComplete: builder.mutation<{ verified: boolean }, string>({
      query: (code) => ({
        url: '/accounts/verify_email/complete',
        method: 'POST',
        body: { code },
      }),
      invalidatesTags: [{ type: 'Accounts', id: 'getCurrentAccount' }],
    }),
    verifyEmailSendCode: builder.mutation<undefined, undefined>({
      query: () => ({
        url: '/accounts/verify_email/send_code',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useChangeEmailCompleteMutation,
  useChangeEmailStartMutation,
  useChangeEmailResendCodeMutation,
  useGetCurrentAccountQuery,
  useGetSpaceUsageQuery,
  useVerifyEmailCompleteMutation,
  useVerifyEmailSendCodeMutation,
} = accountsApi;

export const selectGetCurrentAccountResult =
  accountsApi.endpoints.getCurrentAccount.select(undefined);

export const selectCurrentAccount = (state: RootState) => selectGetCurrentAccountResult(state).data;

export const selectIsAdmin = (state: RootState) =>
  selectGetCurrentAccountResult(state).data?.superuser ?? false;
